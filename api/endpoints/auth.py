import secrets
from typing import Annotated, AnyStr

import bcrypt
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer, OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi_sqlalchemy import db
from jose import JWTError, jwt
from pydantic import BaseModel
from sqlalchemy import func

from utils.environment import get_env
from utils.auth_bearer import JWTBearer
from models.user import User, UserRegister
from models.migrations import RefreshTokenModel, UserModel


SECRET_KEY = get_env('JWT_SECRET_KEY')
ALGORITHM = get_env('JWT_ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = int(get_env('JWT_ACCESS_TOKEN_EXPIRE_MINUTES'))

''' TOKEN SCHEMA'''
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class RefreshToken(BaseModel):
    refresh_token: str

class TokenData(BaseModel):
    username: str | None = None

class UserInDB(User):
    password: str

''' END TOKEN SCHEMA'''


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def hash_password(password):
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password=pwd_bytes, salt=salt)
    return hashed_password.decode('utf8')

# Check if the provided password matches the stored password (hashed)
def verify_password(plain_password, hashed_password):
    plain_encode = plain_password.encode('utf-8')
    hashed_encode = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_encode, hashed_encode)

def get_user(email: str):
    user = db.session.query(UserModel).filter(UserModel.email == email)
    user_dict = user.one_or_none()
    if user_dict:
        return UserInDB(**jsonable_encoder(user_dict))

def authenticate_user(email: str, password: str):
    user = get_user(email)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

def create_all_token(email: AnyStr, refresh_token_sent: RefreshToken = None):
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": email}, expires_delta=access_token_expires
    )
    refresh_token = create_or_update_refresh_token(email, refresh_token_sent)
    return Token(access_token=access_token, refresh_token=refresh_token, token_type="bearer")

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_or_update_refresh_token(email: AnyStr, refresh_token_sent: RefreshToken = None) -> AnyStr:
    if refresh_token_sent:
        db_token_sess = db.session.query(RefreshTokenModel).filter(
            RefreshTokenModel.email == email, 
            RefreshTokenModel.refresh_token == refresh_token_sent.refresh_token, 
            RefreshTokenModel.date_valid >= datetime.now(timezone.utc)
        )
        db_token = db_token_sess.one_or_none()

        if not db_token:
            raise HTTPException(status_code=403, detail="Invalid refresh token.")

    refresh_token = secrets.token_hex(128)
    date_valid = datetime.now(timezone.utc) + timedelta(hours=1)

    db_refresh_token = RefreshTokenModel(
        email = email,
        refresh_token = refresh_token,
        date_valid = date_valid
    )

    db_token_sess = db.session.query(RefreshTokenModel).filter(RefreshTokenModel.email == email)
    db_token = db_token_sess.one_or_none()
    if not db_token:
        db.session.add(db_refresh_token)
    else:
        db_token_sess.update({
            RefreshTokenModel.refresh_token: refresh_token, 
            RefreshTokenModel.date_valid: date_valid
        }, synchronize_session=False)
        
    db.session.commit()
    
    return refresh_token

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    
    user = get_user(email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
):
    if current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

router = APIRouter()

def raw_register(email: str, password: str) -> Token:
    user = authenticate_user(email, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return create_all_token(user.email)


''' ROUTES '''
@router.post("/login")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    return raw_register(form_data.username, form_data.password)

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(form_data: Annotated[UserRegister, Depends()]) -> Token:
    if get_user(form_data.email):
        raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email exist"
        )
    
    hashed_password = hash_password(form_data.password)
    db_user = UserModel(
        firstname=form_data.firstname,
        lastname=form_data.lastname,
        username=form_data.username,
        email=form_data.email, 
        password=hashed_password, 
        time_updated=func.now()
    )
    db.session.add(db_user)
    db.session.commit()

    return raw_register(form_data.email, form_data.password)

security = HTTPBearer()

@router.post("/refresh", status_code=status.HTTP_200_OK)
async def refresh_token(credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)], token: RefreshToken) -> Token:
    try:
        bearer = JWTBearer()
        email = bearer.get_email(credentials.credentials, verify_exp=False)
        print(credentials.credentials)
        return create_all_token(email, token)
    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid token.")

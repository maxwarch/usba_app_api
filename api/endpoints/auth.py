from typing import Annotated

import bcrypt
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi_sqlalchemy import db
from jose import JWTError, jwt
from pydantic import BaseModel
from sqlalchemy import func

from utils.environment import get_env
from models.user import User, UserRegister
from models.migrations import UserModel


SECRET_KEY = get_env('JWT_SECRET_KEY')
ALGORITHM = get_env('JWT_ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = int(get_env('JWT_ACCESS_TOKEN_EXPIRE_MINUTES'))

''' TOKEN SCHEMA'''
class Token(BaseModel):
    access_token: str
    token_type: str

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
    print(plain_password, hashed_password)
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

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

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
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

''' ROUTES '''
@router.post("/login")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    return raw_register(form_data.username, form_data.password)

@router.post("/register")
async def register(form_data: Annotated[UserRegister, Depends()]) -> Token:
    if get_user(form_data.email):
        raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email exist"
        )
    
    hashed_password = hash_password(form_data.password)
    db_user = UserModel(email=form_data.email, password=hashed_password, time_updated=func.now())
    db.session.add(db_user)
    db.session.commit()

    return raw_register(form_data.email, form_data.password)
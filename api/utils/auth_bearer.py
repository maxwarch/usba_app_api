from typing import AnyStr
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import HTTPException, status
from jose import JWTError, jwt

from utils.environment import get_env

SECRET_KEY = get_env('JWT_SECRET_KEY')
ALGORITHM = get_env('JWT_ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = int(get_env('JWT_ACCESS_TOKEN_EXPIRE_MINUTES'))

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=498, detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwtoken: str) -> bool:
        return self.get_email(jwtoken) != None
    
    def get_email(self, jwtoken: str) -> AnyStr | None:
        email = None
        try:
            payload = jwt.decode(jwtoken, SECRET_KEY, algorithms=[ALGORITHM])
            email: str = payload.get("sub")
        except JWTError:
            email = None

        return email
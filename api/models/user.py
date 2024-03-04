from pydantic import BaseModel, EmailStr, StringConstraints
from typing import Annotated, Union

''' SCHEMA '''
class UserLogin(BaseModel):
    username: EmailStr
    password: Annotated[str, StringConstraints(min_length=7, max_length=100)]

    class Config:
        from_attributes = True

class UserRegister(UserLogin):
    email: Annotated[Union[str, None], EmailStr] = None
    username: Annotated[Union[str, None], StringConstraints(min_length=3, pattern="[a-zA-Z0-9_-]+$")] = None
    firstname: Annotated[Union[str, None], StringConstraints(min_length=3)] = None
    lastname: Annotated[Union[str, None], StringConstraints(min_length=3)] = None

    class Config:
        from_attributes = True

class User(UserRegister):
    is_active: bool | None = None

    class Config:
        from_attributes = True
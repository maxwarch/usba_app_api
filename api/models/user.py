from pydantic import BaseModel, EmailStr, constr

''' SCHEMA '''
class UserRegister(BaseModel):
    email: EmailStr
    password: constr(min_length=7, max_length=100) # type: ignore

    class Config:
        from_attributes = True

class User(UserRegister):
    username: constr(min_length=3, pattern="[a-zA-Z0-9_-]+$") | None = None # type: ignore

    is_active: bool | None = None

    class Config:
        from_attributes = True
from fastapi import APIRouter, Depends, HTTPException
from fastapi_sqlalchemy import db
from typing import Annotated
from models.user import User

from ..auth import get_current_active_user

router = APIRouter()


@router.get("/me")
async def me(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user
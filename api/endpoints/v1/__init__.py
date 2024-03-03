from fastapi import APIRouter
from endpoints.v1 import iris, user


router = APIRouter()

router.include_router(iris.router, prefix="/iris", tags=["iris"])
router.include_router(user.router, prefix="/user", tags=["user"])
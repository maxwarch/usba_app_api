from fastapi import APIRouter
from endpoints.v1 import user, test, predictions


router = APIRouter()

router.include_router(test.router, prefix="/test", tags=["test"])

router.include_router(predictions.router, prefix="/predictions", tags=["predictions"])
router.include_router(user.router, prefix="/user", tags=["user"])
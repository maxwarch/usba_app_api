from pydantic import BaseModel
from fastapi import APIRouter, Depends, Response

from utils.email_util import send_email
from utils.auth_bearer import JWTBearer

router = APIRouter()

@router.get('/', dependencies=[Depends(JWTBearer())])
def test():
    return {"status": "ok"}

@router.get('/send_email')
async def send_api_email(response: Response):
    result = await send_email()
    response.status_code = result.status_code
    return result.json()
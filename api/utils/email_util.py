from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from starlette.responses import JSONResponse
from pydantic import EmailStr, BaseModel
from typing import List
from models.user import User

from utils.environment import get_env

class EmailSchema(BaseModel):
    email: List[EmailStr]

async def send_email(user: User, message: str, subject: str) -> bool:
    conf = ConnectionConfig(
        MAIL_USERNAME = get_env('MAIL_USER'),
        MAIL_PASSWORD = get_env('MAIL_PWD'),
        MAIL_FROM = get_env('MAIL_FROM'),
        MAIL_PORT = 587,
        MAIL_SERVER = get_env('MAIL_SMTP'),
        MAIL_FROM_NAME=get_env('MAIL_FROM_NAME'),
        MAIL_STARTTLS = True,
        MAIL_SSL_TLS = False,
        USE_CREDENTIALS = True,
        VALIDATE_CERTS = True
    )

    html = f"""{message}"""

    message = MessageSchema(
        subject=subject,
        recipients=[user.email],
        body=html,
        subtype=MessageType.html)

    fm = FastMail(conf)
    return await fm.send_message(message)
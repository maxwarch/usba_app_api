from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr, BaseModel
from typing import List
from models.user import User
from mailjet_rest import Client

from utils.environment import get_env

class EmailSchema(BaseModel):
    email: List[EmailStr]

#async def send_email(user: User, message: str, subject: str) -> bool:
async def send_email() -> bool:
    # api_key = get_env('MAILJET_API')
    # api_secret = get_env('MAILJET_SECRET')
    # mailjet = Client(auth=(api_key, api_secret), version='v3.1')


    # data = {
    #     'Messages': [
    #         {
    #             "From": {
    #                 "Email": "maxime@bassin-rond.net",
    #                 "Name": "Loan"
    #             },
    #             "To": [
    #                 {
    #                 "Email": "maximekuil@gmail.com",
    #                 "Name": "testsimplon"
    #                 }
    #             ],
    #             "Subject": "My first Mailjet Email!",
    #             "TextPart": "Greetings from Mailjet!",
    #             "HTMLPart": "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
    #         }
    #     ]
    # }

    # result = mailjet.send.create(data=data)
    # return result
    pass
    
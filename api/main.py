from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sqlalchemy import DBSessionMiddleware
import database

from endpoints.v1 import router as api_router_v1
from endpoints import auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# to avoid csrftokenError
print('************', database.SQLALCHEMY_DATABASE_URL)
app.add_middleware(DBSessionMiddleware, db_url=database.SQLALCHEMY_DATABASE_URL)

#app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(api_router_v1, prefix="/api/v1")
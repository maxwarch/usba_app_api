from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from utils.environment import get_env
import urllib.parse

DB_NAME = get_env('DB_NAME')
DB_USER = get_env('DB_USER')
DB_PASSWORD = urllib.parse.quote_plus(get_env('DB_PASSWORD'))

SQLALCHEMY_DATABASE_URL = f'postgresql://{DB_USER}:{DB_PASSWORD}@db/{DB_NAME}'

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
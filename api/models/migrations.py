from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Float, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

Base  = declarative_base()

class UserModel(Base):
    __tablename__ = 'users'
    id  = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    firstname = Column(String, nullable=True)
    lastname = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    time_created = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    time_updated = Column(DateTime(timezone=True), onupdate=func.now(), nullable=False)
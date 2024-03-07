from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Float, Boolean, text
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
    
class RefreshTokenModel(Base):
    __tablename__ = "refresh_token"
    id = Column(Integer, primary_key=True, index = True)
    email = Column(String, ForeignKey("users.email", ondelete="CASCADE"), unique=True, nullable=False)
    refresh_token = Column(String, nullable=False)
    date_valid = Column(DateTime(timezone=True), nullable=False)
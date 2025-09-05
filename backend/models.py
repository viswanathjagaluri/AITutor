# backend/models.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from database import Base # <- Fixed

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    # Add other fields from your schema...

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    # Add other fields...

# ... Define Lesson and Progress models here ...
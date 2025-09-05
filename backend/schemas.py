from pydantic import BaseModel, EmailStr
from typing import Optional

# Schema for creating a new user (registration)
class UserCreate(BaseModel):
    email: EmailStr
    password: str

# Schema for user login
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Schema for the user's public profile data
class User(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True

# Schema for the JWT token
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

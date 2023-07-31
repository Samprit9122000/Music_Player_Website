from database import Base
from sqlalchemy import ForeignKey,Column,Integer,String,Boolean
from sqlalchemy.orm import Relationship


class Users(Base):
    __tablename__="users"

    id=Column(Integer,primary_key=True,index=True)
    username=Column(String)
    email=Column(String,unique=True,index=True)
    password=Column(String)
    isActive=Column(Boolean,default=True)


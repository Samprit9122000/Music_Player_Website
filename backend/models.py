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

    play=Relationship("Playlist",back_populates="owner")



class Playlist(Base):
    __tablename__="playlist"

    id=Column(Integer,primary_key=True,index=True)
    userId=Column(Integer,ForeignKey("users.id"))
    trackId=Column(String)
    trackName=Column(String)

    owner=Relationship("Users",back_populates="play")


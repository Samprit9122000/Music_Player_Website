import sys
sys.path.append('..')

from typing import Optional
from datetime import datetime, timedelta
from fastapi import APIRouter,Depends,HTTPException,status
from fastapi.security import OAuth2PasswordRequestForm,OAuth2PasswordBearer
from pydantic import BaseModel
from sqlalchemy.orm import Session
import models
from database import SessionLocal,engine
from passlib.context import CryptContext
from jose import JWTError, jwt


router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

models.Base.metadata.create_all(bind=engine)

# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Base model for user creation
class createUser(BaseModel):
    username:str
    email:str
    password:str

#password hashing
bcrypt=CryptContext(schemes=["bcrypt"], deprecated="auto")

def hashPassword(password):
    return bcrypt.hash(password)

def verifyPassword(pwd,hashPwd):
    return bcrypt.verify(pwd,hashPwd)

# User authentication function
def authenticateUser(email:str,password:str,db):
    user=db.query(models.Users).filter(models.Users.email==email).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")
    if verifyPassword(password,user.password):
        return user
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="No user found. Password is wrong.")

# User authorization set up with jwt 
SECRET_KEY = "sampritMandal"
ALGO = "HS256"

oauth_bearer=OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_token(username:str,id:int,email:str):
    user_details={"id":id,"username":username,"email":email}
    exp=datetime.utcnow()+timedelta(minutes=30)
    user_details.update({"exp":exp})
    token = jwt.encode(user_details,SECRET_KEY,algorithm=ALGO)
    return token

def get_current_user(token:str=Depends(oauth_bearer)):
    try:
        payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGO])
        username=payload.get("username")
        id=payload.get("id")
        email=payload.get("email")
        if username is None or id is None:
            raise HTTPException(status_code=401,detail="Invalid credentials")
        return {"username":username,"id":id,"email":email}
    
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="JWT ERROR from get_current_user()")



    

    


# api requests

@router.post('/register')
async def register(user:createUser,db:Session=Depends(get_db)):
    checkUser=db.query(models.Users).filter(models.Users.email==user.email).first()
    if(checkUser):
        raise HTTPException(status_code=210,detail="User already exists. Please go for login...")
    
    user_model=models.Users()
    user_model.username=user.username
    user_model.email=user.email
    user_model.password=hashPassword(user.password)

    db.add(user_model)
    db.commit()

    raise HTTPException(status_code=200,detail="user is created")
    


@router.post('/login')
async def login(formData:OAuth2PasswordRequestForm=Depends(),db:Session=Depends(get_db)):
    user_model=authenticateUser(formData.username,formData.password,db)
    if user_model is None:
        raise HTTPException(status_code=404,detail="user not found")
    token=get_token(user_model.username,user_model.id,user_model.email)
    
    return {"user":"authenticated","token":token}
    

@router.get("/user/details")
async def user_details(user:dict=Depends(get_current_user),db:Session=Depends(get_db)):
    if user is None:
        raise HTTPException(status_code=404,detail="user not found")
    user_model=db.query(models.Users).filter(models.Users.id==user.get("id")).first()
    return user_model

@router.put("/user/update")
async def update_user(details:createUser,user:dict=Depends(get_current_user),db:Session=Depends(get_db)):
    if user is None:
        raise HTTPException(status_code=404,detail="user not found")
    user_model=db.query(models.Users).filter(models.Users.id==user.get("id")).first()
    user_model.email=details.email
    user_model.username=details.username
    user_model.password=hashPassword(details.password)
    db.commit()
    return "user information is updated successfully"

@router.delete("/user/delete-account")
async def delete_user(user:dict=Depends(get_current_user),db:Session=Depends(get_db)):
    if user is None:
        raise HTTPException(status_code=404,detail="user not found")
    user_model=db.query(models.Users).filter(models.Users.id==user.get("id")).first()
    if user_model is None:
        raise HTTPException(status_code=404,detail="user not found")
    db.query(models.Users).filter(models.Users.id==user.get("id")).delete()
    db.commit()

    return "User account is deleted successfully"
    

    

    
    
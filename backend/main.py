# from datetime import datetime, timedelta
from fastapi import FastAPI,Depends
# from pydantic import BaseModel
import models
from Routers import auth

app=FastAPI()

app.include_router(auth.router)

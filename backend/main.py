from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware

import models
from Routers import auth

app=FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)

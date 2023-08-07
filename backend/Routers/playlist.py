import sys
sys.path.append("..")

from fastapi import APIRouter,Depends,HTTPException
from pydantic import BaseModel
import models
from sqlalchemy.orm import Session
from .auth import get_current_user,get_db
from database import engine

router=APIRouter(
    prefix="/playlist",
    tags=['playlist']
)

models.Base.metadata.create_all(bind=engine)

class track(BaseModel):
    trackId:str
    trackName:str


@router.get("/")
async def testing():
    return "successful testing"

@router.post("/add")
async def addTrack(details:track,user:dict=Depends(get_current_user),db:Session=Depends(get_db)):
    if user is None:
        raise HTTPException(status_code=404,detail="invalid user (from router/playlist/addTrack)")
    # do not add same track multiple times
    model=db.query(models.Playlist).filter(models.Playlist.trackId==details.trackId).first()
    if model is not None:
        return "track is already present in database"
    playlist_model=models.Playlist()
    playlist_model.trackId=details.trackId
    playlist_model.trackName=details.trackName
    playlist_model.userId=user.get("id")

    db.add(playlist_model)
    db.commit()
    return "song is added in the playlist"


@router.get("/myplaylist")
async def getPlaylist(user:dict=Depends(get_current_user),db:Session=Depends(get_db)):
    if(user is None):
        raise HTTPException(status_code=404,detail="invalid user (from router/playlist/getPlaylist)")
    playlist_model=db.query(models.Playlist).filter(models.Playlist.userId==user.get("id")).all()

    if playlist_model is None:
        raise HTTPException(status_code=404,detail="No track available")

    return {"data":playlist_model}


@router.delete("/delete/{id}")
async def deleteTrack(id:int,user:dict=Depends(get_current_user),db:Session=Depends(get_db)):
    if user is None:
        raise HTTPException(status_code=404,detail="invalid user (from router/playlist/deleteTrack)")
    playlist_model=db.query(models.Playlist).filter(models.Playlist.id==id).first()
    if playlist_model is None:
        raise HTTPException(status_code=404,detail="invalid trackId or track is not present in playlist")
    
    db.query(models.Playlist).filter(models.Playlist.id==id).delete()
    db.commit()

    return "track is deleted from playlist"
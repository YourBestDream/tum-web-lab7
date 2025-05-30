from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..models.database import get_db
from ..models.car_part import CarPart
from ..schemas.car_part import CarPartCreate, CarPart as CarPartSchema, CarPartUpdate
from ..auth.jwt import verify_token, create_access_token
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    return verify_token(token)

@router.post("/token")
async def login_for_access_token(permissions: List[str]):
    access_token = create_access_token(data={"permissions": permissions})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/car-parts/", response_model=List[CarPartSchema])
async def get_car_parts(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    category: Optional[str] = None,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = get_current_user(token)
    if "READ" not in current_user.permissions:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    query = db.query(CarPart)
    if category:
        query = query.filter(CarPart.category == category)
    return query.offset(skip).limit(limit).all()

@router.post("/car-parts/", response_model=CarPartSchema, status_code=status.HTTP_201_CREATED)
async def create_car_part(
    car_part: CarPartCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = get_current_user(token)
    if "WRITE" not in current_user.permissions:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    db_car_part = CarPart(**car_part.dict())
    db.add(db_car_part)
    db.commit()
    db.refresh(db_car_part)
    return db_car_part

@router.get("/car-parts/{car_part_id}", response_model=CarPartSchema)
async def get_car_part(
    car_part_id: int,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = get_current_user(token)
    if "READ" not in current_user.permissions:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    car_part = db.query(CarPart).filter(CarPart.id == car_part_id).first()
    if car_part is None:
        raise HTTPException(status_code=404, detail="Car part not found")
    return car_part

@router.put("/car-parts/{car_part_id}", response_model=CarPartSchema)
async def update_car_part(
    car_part_id: int,
    car_part: CarPartUpdate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = get_current_user(token)
    if "WRITE" not in current_user.permissions:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    db_car_part = db.query(CarPart).filter(CarPart.id == car_part_id).first()
    if db_car_part is None:
        raise HTTPException(status_code=404, detail="Car part not found")
    
    update_data = car_part.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_car_part, key, value)
    
    db.commit()
    db.refresh(db_car_part)
    return db_car_part

@router.delete("/car-parts/{car_part_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_car_part(
    car_part_id: int,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = get_current_user(token)
    if "WRITE" not in current_user.permissions:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    car_part = db.query(CarPart).filter(CarPart.id == car_part_id).first()
    if car_part is None:
        raise HTTPException(status_code=404, detail="Car part not found")
    
    db.delete(car_part)
    db.commit()
    return None

@router.post("/car-parts/{car_part_id}/like", response_model=CarPartSchema)
async def like_car_part(
    car_part_id: int,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = get_current_user(token)
    if "WRITE" not in current_user.permissions:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    car_part = db.query(CarPart).filter(CarPart.id == car_part_id).first()
    if car_part is None:
        raise HTTPException(status_code=404, detail="Car part not found")
    
    car_part.likes += 1
    db.commit()
    db.refresh(car_part)
    return car_part 
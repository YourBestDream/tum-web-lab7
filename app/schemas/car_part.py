from pydantic import BaseModel
from typing import Optional

class CarPartBase(BaseModel):
    name: str
    category: str
    price: float
    description: str
    image: str
    in_stock: bool = True

class CarPartCreate(CarPartBase):
    pass

class CarPart(CarPartBase):
    id: int
    likes: int = 0

    class Config:
        from_attributes = True

class CarPartUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    description: Optional[str] = None
    image: Optional[str] = None
    in_stock: Optional[bool] = None 
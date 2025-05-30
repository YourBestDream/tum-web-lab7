from sqlalchemy import Column, Integer, String, Float, Boolean
from .database import Base

class CarPart(Base):
    __tablename__ = "car_parts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String, index=True)
    price = Column(Float)
    description = Column(String)
    image = Column(String)
    in_stock = Column(Boolean, default=True)
    likes = Column(Integer, default=0) 
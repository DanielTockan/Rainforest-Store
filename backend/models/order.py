from app import db
from models.base import BaseModel

class OrderModel(db.Model, BaseModel):
  __tablename__ = 'orders'
  total_amount = db.Column(db.Integer, nullable=False)
  order_status = db.Column(db.String(20), nullable=False)
  products = db.Column(db.String(100), nullable=False)
  
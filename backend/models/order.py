from app import db
from models.base import BaseModel
from models.order_status import OrderStatusModel

class OrderModel(db.Model, BaseModel):
  __tablename__ = 'orders'
  total_amount = db.Column(db.Integer, nullable=False)
  #order_status_id = db.relationship('OrderStatusModel', backref='order_status.id')
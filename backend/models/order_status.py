from app import db
from models.base import BaseModel

class OrderStatusModel(db.Model, BaseModel):

  __tablename__ = 'order_status'

  order_status_id = db.Column(db.Integer, nullable=False)

from app import app, db
from models.product import ProductModel
from models.order import OrderModel

with app.app_context():

  db.drop_all()
  db.create_all()

  product_1 = ProductModel(
    product_name="Memory Card",
    product_id=1
  )

  product_1.save()

  order_1 = OrderModel(
    total_amount="100",
    #order_status_id=1
  )

  order_1.save()
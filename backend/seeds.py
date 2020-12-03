from app import app, db
from models.product import Product

with app.app_context():

  db.drop_all()
  db.create_all()

  product_1 = Product(
    product_name="Memory Card",
    product_id=1
  )

  product_1.save()
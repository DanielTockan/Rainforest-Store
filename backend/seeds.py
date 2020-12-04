from app import app, db
from models.product import ProductModel
from models.order import OrderModel
from models.customer import CustomerModel
import requests

with app.app_context():

  db.drop_all()
  db.create_all()

  resp = requests.get('https://api.rainforestapi.com/request?api_key=demo&type=reviews&amazon_domain=amazon.com&asin=B073JYC4XM&review_stars=all_critical')

  request_dictionary = resp.json()
  print(request_dictionary['product']['sub_title']['text'])
  print(request_dictionary['summary']['rating'])

  

  product_1 = ProductModel(
    name = request_dictionary['product']['sub_title']['text']
  )


  # product_1 = ProductModel(
  #   name="Memory Card",
  # )

  product_1.save()

  daniel = CustomerModel(
    username="Daniel",
    email="daniel@daniel.com",
    password_hash="daniel",
    products=[product_1]
  )
  daniel.save()

  order_1 = OrderModel(
    total_amount=100,
    order_status='Confirmed',
    products=[product_1],
    customer=daniel
  )
  
  order_1.save()
from app import app, db
from models.product import ProductModel
from models.order import OrderModel
from models.customer import CustomerModel
from models.review import ReviewModel
import requests
from environment.config import API_KEY

with app.app_context():

  db.drop_all()
  db.create_all()

  def get_product(name, url):
    resp = requests.get(f'https://api.rainforestapi.com/request?api_key={API_KEY}&type=bestsellers&url={url}')
    request_dictionary = resp.json()
    products_list = request_dictionary['bestsellers']

    print(f'Updating postgres details for {name}')

    for item in range(len(products_list)):
      try:
        product = ProductModel(
          title = products_list[item]['title'],
          rating = products_list[item]['rating'],
          category = products_list[item]['current_category']['name'],
          price = products_list[item]["price"]["value"],
          currency = products_list[item]['price']['currency'],
          symbol = products_list[item]['price']['symbol'],
          image = products_list[item]['image']
        )
      except: 
        continue

      product.save()

  bestsellers_list = [
    # ("Amazon Devices & Accessories", "https://www.amazon.co.uk/Best-Sellers/zgbs/amazon-devices/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Amazon Launchpad", "https://www.amazon.co.uk/Best-Sellers-Amazon-Launchpad/zgbs/boost/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Apps & Games", "https://www.amazon.co.uk/Best-Sellers-Appstore-Android/zgbs/mobile-apps/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Audible Audiobooks & Originals", "https://www.amazon.co.uk/Best-Sellers-Audible-Audiobooks/zgbs/audible/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Automotive", "https://www.amazon.co.uk/Best-Sellers-Car-Motorbike/zgbs/automotive/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Baby Products", "https://www.amazon.co.uk/Best-Sellers-Baby/zgbs/baby/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Beauty", "https://www.amazon.co.uk/Best-Sellers-Beauty/zgbs/beauty/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Books", "https://www.amazon.co.uk/Best-Sellers-Books/zgbs/books/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Business, Industry & Science", "https://www.amazon.co.uk/Best-Sellers-Business-Industry-Science/zgbs/industrial/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("CD's and Vinyl", "https://www.amazon.co.uk/Best-Sellers-Music/zgbs/music/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Clothing", "https://www.amazon.co.uk/Best-Sellers-Clothing/zgbs/clothing/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Computers and Accessories", "https://www.amazon.co.uk/Best-Sellers-Computers-Accessories/zgbs/computers/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("DIY & Tools", "https://www.amazon.co.uk/Best-Sellers-DIY-Tools/zgbs/diy/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("DVD & Blu-ray", "https://www.amazon.co.uk/Best-Sellers-DVD-Blu-ray/zgbs/dvd/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Digital Music", "https://www.amazon.co.uk/Best-Sellers-MP3-Downloads/zgbs/dmusic/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Electronics & Photo", "https://www.amazon.co.uk/Best-Sellers-Electronics/zgbs/electronics/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Garden & Outdoor", "https://www.amazon.co.uk/Best-Sellers-Garden-Outdoors/zgbs/outdoors/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("GIft Cards", "https://www.amazon.co.uk/Best-Sellers-Gift-Cards-Top-Up/zgbs/gift-cards/ref=zg_bs_nav_0/261-3310178-9376341"),
    ("Grocery", "https://www.amazon.co.uk/Best-Sellers-Grocery/zgbs/grocery/ref=zg_bs_nav_0/261-3310178-9376341")
    # ("Handmade Products", "https://www.amazon.co.uk/Best-Sellers-Handmade/zgbs/handmade/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Health & Personal Care", "https://www.amazon.co.uk/Best-Sellers-Health-Personal-Care/zgbs/drugstore/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Home and Kitchen", "https://www.amazon.co.uk/Best-Sellers-Kitchen-Home/zgbs/kitchen/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Jewellery", "https://www.amazon.co.uk/Best-Sellers-Jewellery/zgbs/jewelry/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Kindle Store", "https://www.amazon.co.uk/Best-Sellers-Kindle-Store/zgbs/digital-text/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Large Appliances", "https://www.amazon.co.uk/Best-Sellers-Large-Appliances/zgbs/appliances/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Lighting", "https://www.amazon.co.uk/Best-Sellers-Lighting/zgbs/lighting/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Luggage", "https://www.amazon.co.uk/Best-Sellers-Luggage/zgbs/luggage/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Musical Instruments & DJ", "https://www.amazon.co.uk/Best-Sellers-Musical-Instruments/zgbs/musical-instruments/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("PC & Video Games", "https://www.amazon.co.uk/Best-Sellers-PC-Video-Games/zgbs/videogames/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Pet Supplies", "https://www.amazon.co.uk/Best-Sellers-Pet-Supplies/zgbs/pet-supplies/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Shoes & Bags", "https://www.amazon.co.uk/Best-Sellers-Shoes-Bags/zgbs/shoes/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Software", "https://www.amazon.co.uk/Best-Sellers-Software/zgbs/software/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Sports & Outdoor", "https://www.amazon.co.uk/Best-Sellers-Sports-Outdoors/zgbs/sports/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Stationary & Office Supplies", "https://www.amazon.co.uk/Best-Sellers-Office-Products/zgbs/officeproduct/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Toys & Games", "https://www.amazon.co.uk/Best-Sellers-Toys-Games/zgbs/kids/ref=zg_bs_nav_0/261-3310178-9376341"),
    # ("Watches", "https://www.amazon.co.uk/Best-Sellers-Watches/zgbs/watch/ref=zg_bs_nav_0/261-3310178-9376341")
  ]

  [get_product(name, url) for name, url in bestsellers_list]

  daniel = CustomerModel(
    username="Daniel",
    email="daniel@daniel.com",
    password="daniel",
    # products=[product_1]
  )
  daniel.save()

  mitty = CustomerModel(
    username="mitty",
    email="mitty@mitty.com",
    password="mitty",
    # products=[product_1]
  )
  # mitty.save()

  # order_1 = OrderModel(
  #   total_amount=100,
  #   order_status='Confirmed',
  #   # products=[product_1],
  #   customer=daniel,
  #   current_order=False
  # )

  # order_2 = OrderModel(
  #   total_amount=200,
  #   order_status='In Progress',
  #   # products=[product_1],
  #   customer=daniel,
  #   current_order=True
  # )

  # order_1.save()

  review1 = ReviewModel(
    content='This product is crazyyyyy',
    customer=daniel,
    # product=product_1
  )
  review1.save()

  review2 = ReviewModel(
    content='This product is brazyyyyy',
    customer=mitty,
    # product=product_1
  )
  review2.save()

  review3 = ReviewModel(
    content='This product is crazyyyyy 2',
    customer=daniel,
    # product=product_1
  )
  review3.save()

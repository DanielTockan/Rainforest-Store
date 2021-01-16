import os
db_URI = os.getenv('DATABASE_URL', 'postgres://localhost:5432/ecommerce_db')
secret = os.getenv('SECRET', 'Manchester United are the greatest football team on Gods green earth!')
API_KEY = os.getenv('API_KEY', '50B20C4B3A16406498FE9ABB28667CD2')

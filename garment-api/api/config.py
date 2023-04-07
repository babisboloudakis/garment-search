import os

# MongoDB Configuration
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")

# API configuration
API_PAGE_SIZE = 20

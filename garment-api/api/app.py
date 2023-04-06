from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pymongo import MongoClient

from api.config import MONGODB_URI, API_PAGE_SIZE

from api.models.garment import garment_from_mongo


app = FastAPI()

# Allow all requests from any origin for the purpose of this assignment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(MONGODB_URI)
    app.db = app.mongodb_client.intelistyle


@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()


@app.get("/")
def get_root():
    """
    Return the number of items stored in the database.

    Returns:
        int: The number of garments stored in the database.
    """
    return app.db.garments.count_documents({})


@app.get("/garments/search/{query}")
def search_garments(query: str, page: int = 1):
    """Look up stored garments using Mongo's full text search using the query
    provided. This method supports paginations and will always return the
    first garment page if no page is provided.

    Args:
        query (str): A text query to find relevant garments.
        page (int, optional): The requested garment page. Will always return
        the first page if not provided.

    Raises:
        HTTPException: Will raise `400` HTTP error when `page <= 0`.

    Returns:
         [Garment]: A list of garment objects matching the search criteria.
    """
    if page < 1:
        raise HTTPException(400, "Page must be a positve integer")

    results = (
        app.db.garments.find(
            {"$text": {"$search": query}}, {"score": {"$meta": "textScore"}}
        )
        .sort([("score", {"$meta": "textScore"})])
        .skip((page - 1) * API_PAGE_SIZE)
        .limit(API_PAGE_SIZE)
    )

    garments = [garment_from_mongo(result) for result in results]
    return garments

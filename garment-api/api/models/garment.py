from pydantic import BaseModel


class Garment(BaseModel):
    """Pydantic model representing a Garment"""

    title: str
    img_url: str


def garment_from_mongo(mongo_garment):
    """Factory method for creating a `Garment` instance from a
    MongoDB dictionary."""
    return Garment(
        title=mongo_garment["product_title"],
        img_url=mongo_garment["image_urls"][0],
    )

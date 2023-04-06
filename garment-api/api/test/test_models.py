from api.models.garment import Garment, garment_from_mongo

import unittest


class TestGarment(unittest.TestCase):
    def test_valid_garment(self):
        valid_input = {
            "title": "Nike T-Shirt",
            "img_url": "https://s3.image.com/nike-tshirt",
        }
        garment = Garment(**valid_input)
        self.assertEqual(garment.title, valid_input["title"])
        self.assertEqual(garment.img_url, valid_input["img_url"])

    def test_garment_from_mongo(self):
        mongo_result = {"product_title": "foo", "image_urls": ["foo.jpg"]}
        garment = garment_from_mongo(mongo_result)
        self.assertEqual(garment, Garment(title="foo", img_url="foo.jpg"))


if __name__ == "__main__":
    unittest.main()

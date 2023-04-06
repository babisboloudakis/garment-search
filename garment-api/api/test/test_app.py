from unittest.mock import MagicMock, patch
from fastapi.testclient import TestClient

from api.app import app

import unittest

test_client = TestClient(app)


class TestApp(unittest.TestCase):
    @patch("api.app.app")
    def test_get_root(self, mock_app):
        mock_result = 100

        mock_app.db = MagicMock()
        mock_app.db.garments.count_documents.return_value = mock_result

        response = test_client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), 100)

    @patch("api.app.app")
    def test_search_garments(self, mock_app):
        mock_results = [
            {"product_title": "T-shirt", "image_urls": ["foo.jpg"]},
            {"product_title": "Jeans", "image_urls": ["bar.png"]},
        ]
        mock_app.db = MagicMock()
        mock_app.db.garments.find().sort().skip().limit.return_value = mock_results

        response = test_client.get("/garments/search/query", params={"page": 1})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            [
                {"title": "T-shirt", "img_url": "foo.jpg"},
                {"title": "Jeans", "img_url": "bar.png"},
            ],
        )

    def test_search_garments_bad_input(self):
        response = test_client.get("/garments/search/query", params={"page": -1})

        self.assertEqual(response.status_code, 400)


if __name__ == "__main__":
    unittest.main()

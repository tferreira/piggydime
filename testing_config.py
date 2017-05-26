from flask_testing import TestCase
from application.app import app, db
from application.models import User
import os
from datetime import datetime
from setup import basedir
import json


class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()

        return json.JSONEncoder.default(self, o)


class BaseTestConfig(TestCase):
    default_user = {
        "email": "default@gmail.com",
        "password": "something2"
    }

    default_account = {
        "label": "test account",
        "bank": "some bank",
        "iban": "FR76 0000 0000 0000 0000",
        "bic": "TESTFRZZ"
    }

    default_transaction = {
        "account_id": 1,
        "label": "some_transaction",
        "amount": 10.33,
        "date": datetime.now()
    }

    def create_app(self):
        app.config.from_object('config.TestingConfig')
        return app

    def setUp(self):
        self.app = self.create_app().test_client()
        db.create_all()

        # create user
        res = self.app.post(
            "/api/create_user",
            data=json.dumps(self.default_user),
            content_type='application/json'
        )
        self.token = json.loads(res.data.decode("utf-8"))["token"]

        with self.app.session_transaction() as sess:
            sess['user_id'] = 1
            sess['_fresh'] = True  # https://flask-login.readthedocs.org/en/latest/#fresh-logins

        # create account
        self.app.post(
            "/api/accounts/create",
            data=json.dumps(self.default_account),
            content_type='application/json',
            headers={'Authorization': self.token}
        )

        # create transaction
        self.app.post(
            "/api/transactions/create",
            data=self.default_transaction,
            content_type='application/json',
            headers={'Authorization': self.token}
        )

    def tearDown(self):
        db.session.remove()
        db.drop_all()

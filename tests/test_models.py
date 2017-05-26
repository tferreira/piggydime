from testing_config import BaseTestConfig
from application.models import User, Account, Transaction


class TestModels(BaseTestConfig):
    def test_get_user_with_email_and_password(self):
        self.assertTrue(
            User.get_user_with_email_and_password(
                self.default_user["email"],
                self.default_user["password"]
            )
        )

    def test_get_accounts_by_user(self):
        user = {'id': 1}
        self.assertTrue(
            len(Account.get_accounts(user))
        )

    def test_get_transactions_by_account_id(self):
        self.assertTrue(
            Transaction.get_transactions(1)
        )
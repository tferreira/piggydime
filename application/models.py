from index import db, bcrypt


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))

    def __init__(self, email, password):
        self.email = email
        self.active = True
        self.password = User.hashed_password(password)

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password)

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None


class Account(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user = db.Column(db.Integer())
    label = db.Column(db.String(255))
    bank = db.Column(db.String(255))
    iban = db.Column(db.String(34), unique=True)
    bic = db.Column(db.String(12))

    def __init__(self, user, label, bank, iban, bic):
        self.user = user['id']
        self.label = label
        self.bank = bank
        self.iban = iban
        self.bic = bic

    @staticmethod
    def get_accounts(user):
        return Account.query.filter_by(user=user['id']).all()

    @staticmethod
    def get_account_by_id(id):
        account = Account.query.filter_by(id=id)
        if account:
            return account
        else:
            return None


class Transaction(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    transaction_id = db.Column(db.String(38), unique=True)
    account_id = db.Column(db.Integer())
    label = db.Column(db.String(255))
    amount = db.Column(db.DECIMAL(19, 4))
    recurrent_group_id = db.Column(db.Integer())
    date = db.Column(db.Date())

    def __init__(self, transaction_id, account_id, label, amount, recurrent_group_id, date):
        self.transaction_id = transaction_id
        self.account_id = account_id
        self.label = label
        self.amount = amount
        self.recurrent_group_id = recurrent_group_id
        self.date = date

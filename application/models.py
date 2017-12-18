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
    projected_date = db.Column(db.Date())

    def __init__(self, user, label, bank, iban, bic, projected_date):
        self.user = user['id']
        self.label = label
        self.bank = bank
        self.iban = iban
        self.bic = bic
        self.projected_date = projected_date

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

    @staticmethod
    def get_projected_date(id):
        account = Account.query.filter_by(id=id).first()
        return account.projected_date


class Transaction(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    transaction_id = db.Column(db.String(38), unique=True)
    account_id = db.Column(db.Integer())
    label = db.Column(db.String(255))
    amount = db.Column(db.DECIMAL(19, 2))
    recurring_group_id = db.Column(db.Integer())
    date = db.Column(db.Date())
    tick = db.Column(db.SmallInteger())

    def __init__(self, transaction_id, account_id, label, amount, recurring_group_id, date, tick):
        self.transaction_id = transaction_id
        self.account_id = account_id
        self.label = label
        self.amount = amount
        self.recurring_group_id = recurring_group_id
        self.date = date
        self.tick = tick

    @staticmethod
    def get_transactions(account_id):
        return Transaction.query \
            .filter((Transaction.account_id == account_id),
                    (db.func.date(Transaction.date) <= Account.get_projected_date(account_id))) \
            .all()


class RecurringGroup(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    account_id = db.Column(db.Integer())
    label = db.Column(db.String(255))
    amount = db.Column(db.DECIMAL(19, 2))
    start_date = db.Column(db.Date())
    end_date = db.Column(db.Date())
    recurrence_day = db.Column(db.Integer())
    recurrence_month = db.Column(db.Integer())

    def __init__(self, account_id, label, amount, start_date, end_date, recurrence_day, recurrence_month):
        self.account_id = account_id
        self.label = label
        self.amount = amount
        self.start_date = start_date
        self.end_date = end_date
        self.recurrence_day = recurrence_day
        self.recurrence_month = recurrence_month

    @staticmethod
    def get_groups(account_ids):
        if not isinstance(account_ids, (list)):
            account_ids = [account_ids]
        return RecurringGroup.query.filter(RecurringGroup.account_id.in_(account_ids)).all()

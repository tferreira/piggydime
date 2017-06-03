from flask import request, render_template, jsonify, g
from .models import User, Account, Transaction, RecurringGroup
from index import app, db
from sqlalchemy.exc import IntegrityError
from sqlalchemy import func
from .utils.auth import generate_token, requires_auth, verify_token
from uuid import uuid4
from datetime import time, datetime
from dateutil.rrule import rrulestr
from dateutil.parser import parse


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')


@app.route("/api/user", methods=["GET"])
@requires_auth
def get_user():
    return jsonify(result=g.current_user)


@app.route("/api/create_user", methods=["POST"])
def create_user():
    incoming = request.get_json()
    user = User(
        email=incoming["email"],
        password=incoming["password"]
    )
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="User with that email already exists"), 409

    new_user = User.query.filter_by(email=incoming["email"]).first()

    return jsonify(
        id=user.id,
        token=generate_token(new_user)
    )


@app.route("/api/get_token", methods=["POST"])
def get_token():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])
    if user:
        return jsonify(token=generate_token(user))

    return jsonify(error=True), 403


@app.route("/api/is_token_valid", methods=["POST"])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming["token"])

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify(token_is_valid=False), 403


@app.route("/api/balances", methods=["GET"])
@requires_auth
def get_balances():
    balancesList = []
    accountsObjects = Account.get_accounts(g.current_user)
    for account in accountsObjects:
        balance = db.session.query(func.sum(Transaction.amount).label("balance")).filter_by(account_id=account.id).first()
        balancesList.append({
            'account_id': account.id,
            'balance': str(balance.balance)
        })
    return jsonify(result=balancesList)


@app.route("/api/accounts", methods=["GET"])
@requires_auth
def get_accounts():
    accountsList = []
    accountsObjects = Account.get_accounts(g.current_user)
    for account in accountsObjects:
        accountsList.append({
            'id': account.id,
            'label': account.label,
            'bank': account.bank,
            'iban': account.iban,
            'bic': account.bic,
        })
    return jsonify(result=accountsList)


@app.route("/api/accounts/create", methods=["POST"])
@requires_auth
def create_account():
    incoming = request.get_json()
    account = Account(
        user=g.current_user,
        label=incoming["label"],
        bank=incoming["bank"],
        iban=incoming["iban"],
        bic=incoming["bic"]
    )
    db.session.add(account)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="Account with that IBAN already exists"), 409

    return jsonify(
        id=account.id
    )


@app.route("/api/accounts/edit", methods=["POST"])
@requires_auth
def edit_account():
    incoming = request.get_json()
    account = Account.query.filter_by(id=incoming["id"])
    account.update({
        'label': incoming["label"],
        'bank': incoming["bank"],
        'iban': incoming["iban"],
        'bic': incoming["bic"]
    })

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="Account with that IBAN already exists"), 409

    return jsonify(
        id=account.first().id
    )


@app.route("/api/accounts/delete", methods=["POST"])
@requires_auth
def delete_account():
    incoming = request.get_json()
    account = Account.query.filter_by(id=incoming["id"]["id"])
    account.delete()
    transaction = Transaction.query.filter_by(account_id=incoming["id"]["id"])
    transaction.delete()
    group = RecurringGroup.query.filter_by(account_id=incoming["id"]["id"])
    group.delete()

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="Failed to delete account."), 409

    return jsonify(
        status='ok'
    )


@app.route("/api/transactions", methods=["GET"])
@requires_auth
def get_transactions():
    incoming = request.args
    account_id = incoming["account_id"]
    transactionsList = []
    transactionsObjects = Transaction.get_transactions(account_id)
    for transaction in transactionsObjects:
        transactionsList.append({
            'transaction_id': transaction.transaction_id,
            'account_id': transaction.account_id,
            'label': transaction.label,
            'amount': str(transaction.amount),  # Decimal is not JSON serializable
            'recurring_group_id': transaction.recurring_group_id,
            'date': transaction.date.strftime('%Y-%m-%d'),
        })
    return jsonify(result=transactionsList)


@app.route("/api/transactions/create", methods=["POST"])
@requires_auth
def create_transaction():
    incoming = request.get_json()
    transaction_id = str(uuid4())
    recurring_group_id = None
    date = datetime.now()  # helpful for unit tests
    if "recurring_group_id" in incoming:
        recurring_group_id = incoming["recurring_group_id"]
    if "date" in incoming:
        date = incoming["date"]
    transaction = Transaction(
        transaction_id=transaction_id,
        account_id=incoming["account_id"],
        label=incoming["label"],
        amount=incoming["amount"],
        recurring_group_id=recurring_group_id,
        date=date
    )
    db.session.add(transaction)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="Account with that IBAN already exists"), 409

    return jsonify(
        id=transaction.id
    )


@app.route("/api/transactions/edit", methods=["POST"])
@requires_auth
def edit_transaction():
    incoming = request.get_json()
    transaction = Transaction.query.filter_by(transaction_id=incoming["transaction_id"])
    transaction.update({
        'label': incoming["label"],
        'amount': incoming["amount"],
        'date': incoming["date"],
    })

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="That unique transaction_id already exists."), 409

    return jsonify(
        id=transaction.first().id
    )


@app.route("/api/transactions/delete", methods=["POST"])
@requires_auth
def delete_transaction():
    incoming = request.get_json()
    transaction = Transaction.query.filter_by(transaction_id=incoming["transaction_id"])
    transaction.delete()

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="Failed to delete transaction."), 409

    return jsonify(
        status='ok'
    )


@app.route("/api/recurring", methods=["GET"])
@requires_auth
def get_recurring_groups():
    accountsIds = []
    accountsObjects = Account.get_accounts(g.current_user)
    for account in accountsObjects:
        accountsIds.append(account.id)

    groupList = []
    groupObjects = RecurringGroup.get_groups(accountsIds)
    for group in groupObjects:
        groupList.append({
            'id': group.id,
            'account_id': group.account_id,
            'amount': str(group.amount),  # Decimal is not JSON serializable
            'label': group.label,
            'start_date': group.start_date.strftime('%Y-%m-%d'),
            'end_date': group.end_date.strftime('%Y-%m-%d'),
            'recurrence_day': group.recurrence_day,
            'recurrence_period': group.recurrence_period,
        })
    return jsonify(result=groupList)


def generate_recurring(account_id, label, amount, start_date, end_date, recurring_group_id, recurrence_day, recurrence_period):
    # for now recurrence_period allowed is only MONTHLY
    frequency_choices = {'yearly': 'YEARLY', 'monthly': 'MONTHLY', 'weekly': 'WEEKLY', 'daily': 'DAILY'}
    # frequency = frequency_choices.get(incoming['recurrence_period'], 'MONTHLY')
    frequency = frequency_choices.get('monthly', 'MONTHLY')
    rule_string = "RRULE:FREQ={};BYMONTHDAY={};INTERVAL=1".format(frequency, recurrence_day)
    rule = rrulestr(rule_string, dtstart=datetime.combine(parse(start_date), time()))
    times = rule.between(
        after=datetime.combine(parse(start_date), time()),
        before=datetime.combine(parse(end_date), time()),
        inc=True)

    for occurence in times:
        transaction_id = str(uuid4())
        transaction = Transaction(
            transaction_id=transaction_id,
            account_id=account_id,
            label=label,
            amount=amount,
            recurring_group_id=recurring_group_id,
            date=occurence
        )
        db.session.add(transaction)


@app.route("/api/recurring/create", methods=["POST"])
@requires_auth
def create_recurring_group():
    incoming = request.get_json()
    start_date = datetime.now()  # helpful for unit tests
    end_date = datetime.now()  # helpful for unit tests
    if "start_date" in incoming:
        start_date = incoming["start_date"]
    if "end_date" in incoming:
        end_date = incoming["end_date"]
    group = RecurringGroup(
        account_id=incoming["account_id"],
        label=incoming["label"],
        amount=incoming["amount"],
        start_date=start_date,
        end_date=end_date,
        recurrence_day=incoming["recurrence_day"],
        recurrence_period=incoming["recurrence_period"],
    )
    db.session.add(group)

    # Create linked transactions
    generate_recurring(
        incoming['account_id'],
        incoming['label'],
        incoming['amount'],
        start_date,
        end_date,
        group.id,
        incoming['recurrence_day'],
        incoming['recurrence_period']
    )

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="Error while trying to create new recurring group."), 409

    return jsonify(
        id=group.id
    )


@app.route("/api/recurring/edit", methods=["POST"])
@requires_auth
def edit_recurring_group():
    incoming = request.get_json()
    group = RecurringGroup.query.filter_by(id=incoming["id"])
    group.update(incoming)

    # Regenerate linked transactions
    transactions = Transaction.query.filter_by(recurring_group_id=incoming["id"])
    transactions.delete()
    generate_recurring(
        group.first().account_id,
        group.first().label,
        group.first().amount,
        group.first().start_date,
        group.first().end_date,
        group.first().id,
        group.first().recurrence_day,
        group.first().recurrence_period
    )

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="Error while trying to update recurring group."), 409

    return jsonify(
        id=group.first().id
    )


@app.route("/api/recurring/delete", methods=["POST"])
@requires_auth
def delete_recurring_group():
    incoming = request.get_json()
    group = RecurringGroup.query.filter_by(id=incoming["id"])
    group.delete()

    # Delete linked transactions
    transactions = Transaction.query.filter_by(recurring_group_id=incoming["id"])
    transactions.delete()

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="Failed to delete recurring group."), 409

    return jsonify(
        status='ok'
    )

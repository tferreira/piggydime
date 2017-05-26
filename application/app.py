from flask import request, render_template, jsonify, url_for, redirect, g
from .models import User, Account, Transaction
from index import app, db
from sqlalchemy.exc import IntegrityError
from sqlalchemy import func
from .utils.auth import generate_token, requires_auth, verify_token
from uuid import uuid4
from datetime import datetime


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
            'recurrent_group_id': transaction.recurrent_group_id,
            'date': transaction.date.strftime('%Y-%m-%d'),
        })
    return jsonify(result=transactionsList)


@app.route("/api/transactions/create", methods=["POST"])
@requires_auth
def create_transaction():
    incoming = request.get_json()
    transaction_id = str(uuid4())
    recurrent_group_id = None
    date = datetime.now()  # helpful for unit tests
    if "recurrent_group_id" in incoming:
        recurrent_group_id = incoming["recurrent_group_id"]
    if "date" in incoming:
        date = incoming["date"]
    transaction = Transaction(
        transaction_id=transaction_id,
        account_id=incoming["account_id"],
        label=incoming["label"],
        amount=incoming["amount"],
        recurrent_group_id=recurrent_group_id,
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

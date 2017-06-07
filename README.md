# Piggydime #

This app allows you to keep track of your bank accounts balance.

This project is still in development.
The features that are implemented are the following:

 * [x] Be able to have multiple accounts
 * [x] Monthly recurring transactions
 * [x] Previsional balance at a custom date

 In the future, we'd want to have:

 * [ ] View toggle button for recurring transactions
 * [ ] Statistics charts
 * [ ] Currency symbol (choosen by the user)
 * [ ] Import transactions data from bank CSV exports
 * [ ] Backup/Restore feature

This application has been build on top of the [React-Redux-Flask](https://github.com/dternyak/React-Redux-Flask) boilerplate (Flask JWT Blackend and a React/Redux frontend with Material UI):

* Python 3.5
* Pytest
* Flask
* Alembic
* SQLAlchemy
* React
* Redux
* React-Router 2.0
* React-Router-Redux
* Babel 6
* SCSS processing
* Webpack

![screenshot](http://i.imgur.com/GF7fc57.jpg)

## How to install

### Install Python libraries
You may want to create a virtualenv for this.
If you're running this project on OSX, use the following commands:
```sh
$ pip3.5 install -r requirements-osx.txt
$ pip3.5 mysql-connector-python-rf==2.2.2 --egg
```
On unix systems:
```sh
$ pip3.5 install -r requirements.txt
$ pip3.5 uninstall py-bcrypt && pip3.5 install py-bcrypt  # this need to be fixed
```

### Create DB

You can choose MySQL or Postgres.
SQLite has been intentionally omitted as there is issues with Decimal types.

You'll have to create the database.

More about connection strings in this [flask config guide.](http://flask-sqlalchemy.pocoo.org/2.1/config/)

```sh
$ export DATABASE_URL="postgresql://username:password@localhost/mydatabase"

or

$ export DATABASE_URL="mysql+mysqlconnector://username:password@localhost/mydatabase"

$ python3.5 manage.py db upgrade
```

### Install Front-End Requirements
```sh
$ cd static
$ npm install -g yarn
$ yarn
```

### Run Back-End

```sh
$ python3.5 manage.py runserver
```

### Build Front-End

```sh
$ yarn run build:production
```

### FOR DEVELOPERS - Test Back-End

```sh
$ python3.5 test.py tests/
with code coverage:
$ python3.5 test.py --cov-report=term --cov-report=html --cov=application/ tests/
```

### FOR DEVELOPERS -  Run Front-End

```sh
$ cd static
$ yarn start
```

### FOR DEVELOPERS - DB Changes (Migration)

To create new migrations, add your schema on `models.py` then use:

```sh
$ python3.5 manage.py db revision --autogenerate
$ python3.5 manage.py db upgrade
```

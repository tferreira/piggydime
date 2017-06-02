# Piggydime #

This app allows you to keep track of your bank accounts balance.

This project is a WIP. The basic features that needs to be implemented are the following:

 * [x] Be able to have multiple accounts
 * [x] Add and edit transactions easily
 * [ ] Recurring transactions
 * [ ] Previsional balance to a custom date

 In the future, we'd want to have:

 * [ ] Statistics charts
 * [ ] Import transactions data from bank CSV exports
 * [ ] Backup/Restore feature

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
```

### Create DB
```sh
$ export DATABASE_URL="postgresql://username:password@localhost/mydatabase"

or

$ export DATABASE_URL="mysql+mysqlconnector://username:password@localhost/mydatabase"

SQLite has been intentionally omitted as there is issues with Decimal types.
More about connection strings in this [flask config guide](http://flask-sqlalchemy.pocoo.org/2.1/config/)

$ python3.5 manage.py db upgrade
```

To create new migrations, add your schema on `models.py` then use:

```sh
$ python3.5 manage.py db revision --autogenerate
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

### Test Back-End

```sh
$ python3.5 test.py tests/
with code coverage:
$ python3.5 test.py --cov-report=term --cov-report=html --cov=application/ tests/
```

### Run Front-End

```sh
$ cd static
$ yarn start
```

### Build Front-End

```sh
$ yarn run build:production
```

### New to Python?

If you are approaching this demo as primarily a frontend dev with limited or no python experience, you may need to install a few things that a seasoned python dev would already have installed.

Most Macs already have python installed but you may not have python 3.5 or pip install. You can check to see if you have them installed:

```
$ python --version
$ pip --version 
```

If pip is not installed, you can follow this simple article to [get both homebrew and python](https://howchoo.com/g/mze4ntbknjk/install-pip-on-mac-os-x)

After you install python, you can optionally also install python 3.5

```
$ brew install python3.5
```

Now you can check again to see if both python and pip are installed. Once pip is installed, you can download the required flask modules:

```
$ sudo pip install flask flask_script flask_migrate flask_bcrypt 
```

Now, you can decide on which database you wish to use. 

#### New to MySQL? 

If you decide on MySQL, install the free community edition of [MySQL](https://dev.mysql.com/downloads/mysql/) and [MySQL Workbench](https://www.mysql.com/products/workbench/)

1. start MySQL from the System Preferences
2. open MySQL Workbench and [create a database](http://stackoverflow.com/questions/5515745/create-a-new-database-with-mysql-workbench) called mydatabase but don't create the tables since python will do that for you
3. Install the MySQL connector for Python, add the DATABASE_URL configuration, and create the database and tables

```
$ sudo pip install mysql-connector-python-rf
$ export DATABASE_URL="mysql+mysqlconnector://username:password@localhost/mydatabase"
$ python3.5 manage.py db upgrade
```

4. Run Back-End

```
$ python3.5 manage.py runserver
```

If all goes well, you should see ```* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)``` followed by a few more lines in the terminal.

5. open a new tab to the same directory and run the front end

```
$ cd static
$ yarn
$ yarn start
```

6. open your browser to http://localhost:3000/register and setup your first account
7. enjoy! By this point, you should be able to create an account and login without errors. 





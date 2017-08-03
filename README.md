# Piggydime #

This app allows you to keep track of your bank accounts balance.

This project is still in development but the main features are already implemented. It includes:

 * [x] Manage multiple bank accounts
 * [x] Transactions ticking
 * [x] Create monthly and yearly recurring transactions
 * [x] Check your future account balance at a specific date
 * [x] Mini charts preview of debit vs credit by month
 * [x] English and French languages support

 Upcoming features:

 * [ ] Currency symbols
 * [ ] Statistics charts on home page tiles
 * [ ] Backup/Restore (CSV format)

This application has been build on top of the [React-Redux-Flask](https://github.com/dternyak/React-Redux-Flask) boilerplate (Flask JWT Blackend and a React/Redux frontend with Material UI).

![screenshot](http://i.imgur.com/lemwdQQ.png)

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
$ pip3.5 uninstall py-bcrypt && pip3.5 install py-bcrypt  # this needs to be fixed
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

### FOR DEVELOPERS -  Prettify

This project uses the Prettify library in order to have a consistent coding style.
Options are the following: `--single-quote --no-semi`

Before commiting and opening a pull request, please run at the root of the repository:

```sh
$ make pretty
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

## How to install with Docker

### Requirements

If you wish to install and run Piggydime using Docker, you will need Docker Compose.
Full documentation is available on [Docker's website](https://docs.docker.com/compose/).

### Running the application

The latest images of Piggydime are available on the official Docker Hub, so you don't need to build them yourself.
To pull these images and run the application, use:

```sh
$ docker-compose pull
$ docker-compose up
```

By default, the port that will be exposed on your server to access the application from the web will be the port `80`.
If you want to use another port, you need to set the `EXTERNAL_PORT` environment variable:

```sh
$ export EXTERNAL_PORT=8080
$ docker-compose up
```

### Backups

Your data is stored on a Docker Volume on the host server.
On Linux, you can find the volumes used by the database container on the `/var/lib/docker/volumes` directory.
More information about volumes can be found on [Docker's website](https://docs.docker.com/engine/tutorials/dockervolumes/).


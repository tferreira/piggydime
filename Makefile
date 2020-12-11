# Makefile

VIRTUALENV = venv/
PRETTIER = ./static/node_modules/.bin/prettier

install: create_virtualenv pip_install

create_virtualenv:
	if [ ! -d venv ]; then python3 -m venv $(VIRTUALENV); fi

pip_install:
	. $(VIRTUALENV)bin/activate; pip install -r requirements.txt
	. $(VIRTUALENV)bin/activate; pip install py-bcrypt==0.4

pretty:
	$(PRETTIER) --single-quote --no-semi --write "static/src/**/*.js"

launch:
	export DATABASE_URL="mysql+mysqlconnector://root@localhost/piggydime"; . $(VIRTUALENV)bin/activate; python manage.py runserver

dbgenerate:
	export DATABASE_URL="mysql+mysqlconnector://root@localhost/piggydime"; python3 manage.py db revision --autogenerate

dbupgrade:
	export DATABASE_URL="mysql+mysqlconnector://root@localhost/piggydime"; python3 manage.py db upgrade

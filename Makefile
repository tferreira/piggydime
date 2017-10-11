# Makefile

VIRTUALENV = venv/
PRETTIER = ./static/node_modules/.bin/prettier

install: create_virtualenv pip_install

create_virtualenv:
	if [ ! -d env ]; then virtualenv -p python3.5 $(VIRTUALENV); fi

pip_install:
	. $(VIRTUALENV)bin/activate; pip3.5 install -r requirements.txt
	. $(VIRTUALENV)bin/activate; pip3.5 install py-bcrypt==0.4

pretty:
	$(PRETTIER) --single-quote --no-semi --write "static/src/**/*.js"

launch:
	export DATABASE_URL="mysql+mysqlconnector://root@localhost/piggydime"; . $(VIRTUALENV)bin/activate; python3.5 manage.py runserver

dbgenerate:
	export DATABASE_URL="mysql+mysqlconnector://root@localhost/piggydime"; python3.5 manage.py db revision --autogenerate

dbupgrade:
	export DATABASE_URL="mysql+mysqlconnector://root@localhost/piggydime"; python3.5 manage.py db upgrade

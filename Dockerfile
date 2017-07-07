FROM python:3.5

COPY . /opt/api
WORKDIR /opt/api

ENV DATABASE_URL "mysql+mysqlconnector://root:supersecure@db/piggydime"

RUN pip install -r requirements.txt
RUN python3.5 manage.py db upgrade

EXPOSE 80
CMD python3.5 manage.py runserver
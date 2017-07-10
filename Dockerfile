FROM python:3.5

COPY . /opt/api
WORKDIR /opt/api

ENV DATABASE_URL "mysql+mysqlconnector://root:supersecure@mysql/piggydime"

RUN pip install -r requirements.txt

ARG API_PORT
ENV API_PORT $API_PORT
EXPOSE ${API_PORT}
CMD python3.5 manage.py db upgrade && python3.5 manage.py runserver -h 0.0.0.0 -p $API_PORT

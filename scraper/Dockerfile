FROM python

WORKDIR /app

ARG DEBUG=False

ENV DEBUG=${DEBUG}

COPY . .

RUN /bin/bash -c "source app/bin/activate && pip install -r requirements.txt"

EXPOSE 3001

CMD [ "app/bin/python3.11", "./__init__.py" ]

FROM python:3.10

WORKDIR /app
COPY . .

RUN pip install flask pydantic flask-cors

CMD ["python", "backend/app.py"]
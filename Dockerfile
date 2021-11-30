FROM python:3.9
RUN pip install reliquery-ui==0.2.5

RUN mkdir /root/reliquery/

EXPOSE 8000

CMD ["uvicorn", "--factory", "reliquery_ui.main:create_app", "--host", "0.0.0.0", "--port", "8000"]
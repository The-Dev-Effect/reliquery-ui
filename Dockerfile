FROM python:3.9
RUN pip install reliquery-ui --upgrade

RUN mkdir /root/reliquery/

EXPOSE 8000

CMD ["uvicorn", "reliquery_ui.main:create_app", "--host", "0.0.0.0", "--port", "8000"]
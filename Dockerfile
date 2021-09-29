FROM python:3.9
RUN pip install reliquery-ui --upgrade
EXPOSE 8000

CMD ["uvicorn", "reliquery_ui.main:app", "--host", "0.0.0.0", "--port", "8000"]
FROM node:16-alpine as install-stage
WORKDIR /frontend
COPY ../frontend /frontend

RUN yarn install

# build stage
FROM install-stage as build-stage
RUN yarn build

# build a fastapi container
FROM python:3.9
WORKDIR /
COPY ../requirements.txt /
RUN pip install -r requirements.txt
COPY --from=build-stage /frontend/dist /frontend/dist
COPY ../reliquery_ui /reliquery_ui

EXPOSE 8000

CMD ["uvicorn", "reliquery_ui.main:app", "--host", "0.0.0.0", "--port", "8000"]
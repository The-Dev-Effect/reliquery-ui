# Reliquery UI
Frontend for Reliquery
Science's Artifact Antiformat

## Quickstart
Install Reliquery-UI using pip
```
$ pip install reliquery-ui
```
Run UI server
```
$ uvicorn reliquery_ui.main:app
```
Navigate to http://localhost:8000/reliquery/demo/tutorial/intro to view Relics

## For development

### Local Install
```bash
cd reliquery-ui
pip install -e .
cd frontend
yarn install
```
### Start Services
new shell
```bash
cd frontend
yarn build
uvicorn reliquery_ui.main:app --reload
```
for dev gui
```bash
cd frontend
yarn start
```

### Link Location
A Relic can be shared via a link like:
<br />
{server}/reliquery/storage_name/relic_type/relic_name
<br />
http://localhost:8000/reliquery/demo/tutorial/intro

### Web Api Exploration
{server}/redoc
<br />
http://localhost:8000/redoc

## License

Reliquery UI is free and open source! All code in this repository is dual-licensed under either:

* MIT License ([LICENSE-MIT](docs/LICENSE-MIT) or [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT))
* Apache License, Version 2.0 ([LICENSE-APACHE](docs/LICENSE-APACHE) or [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0))

at your option. This means you can select the license you prefer.

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any
additional terms or conditions.

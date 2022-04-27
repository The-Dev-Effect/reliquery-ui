# Reliquery UI

[![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/The-Dev-Effect/reliquery-ui?include_prereleases)](https://pypi.org/project/reliquery-ui/)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/The-Dev-Effect/reliquery-ui/Python%20package)](https://github.com/The-Dev-Effect/reliquery-ui/actions/workflows/main.yml)

## Science's Artifact Anti-format UI

A frontend UI for the Reliquery tool. Displaying Relics and their associated data.

## Table of Contents

1. [Quickstart](#start)
2. [Development](#dev)
   1. [Local Install](#loc)
   2. [Start Services](#serv)
   3. [Link Location](#link)
   4. [Web API Exploration](#api)
3. [License](#lic)

## Quickstart <a name="start"></a>

Install Reliquery-UI using pip

```
$ pip install reliquery-ui
```

Run UI server

```
$ reliquery-ui
```

Navigate to http://localhost:8000/reliquery/demo/tutorial/intro to view Relics

## For development<a name="dev"></a>

### Local Install<a name="loc"></a>

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
reliquery-ui
```

for dev gui

```bash
cd frontend
yarn start
```

### Link Location<a name="link"></a>

A Relic can be shared via a link like:
<br />
{server}/reliquery/storage_name/relic_type/relic_name
<br />
http://localhost:8000/reliquery/demo/tutorial/intro

### Web Api Exploration<a name="api"></a>

{server}/redoc
<br />
http://localhost:8000/redoc

## License<a name="lic"></a>

Reliquery UI is free and open source! All code in this repository is dual-licensed under either:

- MIT License ([LICENSE-MIT](docs/LICENSE-MIT) or [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT))
- Apache License, Version 2.0 ([LICENSE-APACHE](docs/LICENSE-APACHE) or [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0))

at your option. This means you can select the license you prefer.

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any
additional terms or conditions.

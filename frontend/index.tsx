import { useState, useEffect } from "react";
import * as React from "react";
import { render } from "react-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";

const Relic = () => {
  // @ts-ignore
  const { name, relic_type } = useParams();
  const [relic, setRelic] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `http://localhost:8000/reliquery/${relic_type}/${name}`
      );

      const json = await result.json();
      setRelic(json);
    };

    fetchData();
  }, []);

  if (relic === null) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <Card>
      <dl>
        <dt>Name:</dt>
        <dd>{relic.name}</dd>
        <dt>Type:</dt>
        <dd>{relic.relic_type}</dd>
      </dl>
    </Card>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <h2>Welcome to Reliquery!</h2>
        <Switch>
          <Route path="/reliquery/:relic_type/:name" children={<Relic />} />
        </Switch>
      </div>
    </Router>
  );
};

render(<App />, document.getElementById("root"));

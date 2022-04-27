import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LandingPage } from "./landing-page";
import { ChakraProvider } from "@chakra-ui/react";
import { Dashboard } from "./dashboard";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <div>
          <Switch>
            <Route path="/dashboard" children={<Dashboard />} />
            <Route path="/" children={<LandingPage />} />
          </Switch>
        </div>
      </Router>
    </ChakraProvider>
  );
};

render(<App />, document.getElementById("root"));

import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import Example from "./Example";
import TestRequest from "./testrequest";

const App = () => {
  return (
    <Provider theme={defaultTheme}>
      <Example />
      <TestRequest />
    </Provider>
  );
};

export default App;

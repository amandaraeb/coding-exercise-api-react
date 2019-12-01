import React from "react";
import ReactDOM from "react-dom";
import { Container, Header } from "semantic-ui-react";

import ResultsList from "./ResultsList";
import GroupsList from "./GroupsList";
import InputFileReader from "./InputFileReader";
import GroupInputFileReader from "./GroupInputFileReader";

const App = ({ children }) => (
  <Container style={{ margin: 20 }}>
    <Header as="h3"><span role="img" aria-label="logo">⛵️</span> Breeze Church Management </Header>

    {children}
  </Container>
);

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);



ReactDOM.render(
  <App>
    <h3> Upload People </h3>
    <InputFileReader/>
    <h3> Upload Groups </h3>
    <GroupInputFileReader/>
    <ResultsList/>
    <GroupsList/>
  </App>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { Header, PkmnList } from "./containers/";

const App = () => (
    <div className="container">
        <Header />
        <PkmnList />
    </div>
);

ReactDOM.render(
    <App />,
    document.getElementById("app")
);

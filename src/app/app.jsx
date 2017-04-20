import React from "react";
import ReactDOM from "react-dom";
import { PkmnList } from "./containers/";

const App = () => (
    <div className="container">
        <PkmnList />
    </div>
);

ReactDOM.render(
    <App />,
    document.getElementById("app")
);

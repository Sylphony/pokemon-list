import React, { Component, PropTypes } from "react";
import classNames from "classnames";

/**
 * Button component
 */
const Button = (props) => {
    const { name, classes, click } = props;

    const theClassNames = classNames(
        "btn",
        "btn-primary",
        classes
    );

    return (
        <button type="button" className={ theClassNames } onClick={ click }>{ name }</button>
    );
};

export default Button;

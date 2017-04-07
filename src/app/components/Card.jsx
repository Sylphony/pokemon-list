import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import { capitalize } from "./../utils/";

/**
 * The type info of a Pokemon.
 */
const CardTypeInfo = (props) => {
    const { type } = props;

    const theClassNames = classNames(
        "card-type__info",
        ["card-type__info--" + type] : type
    );

    return (
        <span className={ theClassNames }>{ capitalize(type) }</span>
    );
};

/**
 * The Card component.
 */
const Card = (props) => {
    const { id, name, types, img } = props;

    const pkmnTypes = types.map(type => {
        return (
            <CardTypeInfo type={ type } key={ type } />
        );
    });

    return (
        <div className="card text-center">
            <span className={ "card-id card-id--" + types[0] }>{ id }</span>
            <img className="card-img" src={ img } alt={ (name || "No") + " sprite" } />
            <h2 className="card-title">{ capitalize(name) }</h2>
            <div className="card-type">
                { pkmnTypes }
            </div>
        </div>
    );
};

export default Card;  

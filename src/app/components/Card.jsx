import React, { PropTypes } from "react";
import classNames from "classnames";
import { capitalize } from "./../utils/";

/**
 * The type info of a Pokemon.
 */
const CardTypeInfo = (props) => {
    const { type } = props;

    const theClassNames = classNames(
        "card__type-info",
        "card__type-info--" + type
    );

    return (
        <span className={ theClassNames }>{ capitalize(type) }</span>
    );
};

CardTypeInfo.propTypes = {
    type: PropTypes.string.isRequired
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
            <span className={ "card__id card__id--" + types[0] }>{ id }</span>
            <img className="card__img" src={ img } alt={ (name || "No") + " sprite" } />
            <h2 className="card__title">{ capitalize(name) }</h2>
            <div className="card__type">
                { pkmnTypes }
            </div>
        </div>
    );
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    types: PropTypes.array.isRequired,
    img: PropTypes.string.isRequired
};

export default Card;  

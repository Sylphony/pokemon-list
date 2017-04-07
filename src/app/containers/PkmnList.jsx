import React, { Component, PropTypes } from "react";
import fetch from "unfetch";
import Immutable from "immutable";
import { Card } from "./../components/";

class PkmnList extends Component {
    constructor() {
        super();

        this.state = {
            pkmnInfo: []
        };
    }

    componentDidMount() {
        fetch("http://pokeapi.co/api/v2/pokemon/?limit=5")
            .then(resp => resp.json())
            .then(data => {
                data.results.forEach(result => {       
                    fetch(result.url)
                        .then(respData => respData.json())
                        .then(dataData => {
                            this.setState({
                                pkmnInfo: [
                                    ...this.state.pkmnInfo,
                                    dataData
                                ]
                            });
                        });
                });
            });
    }

    render() {
        const allCards = this.state.pkmnInfo.map(pkmn => {
            const pkmnTypes = pkmn.types.map(info => {
                return info.type.name;
            }).reverse();

            return (
                <div className="col-md-4" key={ pkmn.name }>
                    <Card id={ pkmn.id } name={ pkmn.name } types={ pkmnTypes } img={ pkmn.sprites["front_default"] } />
                </div>
            );
        });

        return (
            <div className="row">
                { allCards }
            </div>
        );
    }
}

export default PkmnList;

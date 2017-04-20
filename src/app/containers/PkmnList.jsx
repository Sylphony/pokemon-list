import React, { Component, PropTypes } from "react";
import Immutable from "immutable";
import axios from "axios";
import { getPkmn, getPkmnList } from "./support/api";
import { storeCachePkmn, getCachePkmn } from "./support/cache";
import { Card } from "./../components/";

class PkmnList extends Component {
    constructor() {
        super();

        this.state = {
            pkmnInfo: []
        };
    }

    componentDidMount() {
        // Get the Pokemon list
        getPkmnList(6)
            .then(resp => {
                const pkmnList = resp.data.results;

                // With the Pokemon list, fetch from the cache
                const promises = pkmnList.map(pkmn => {
                    return getCachePkmn(pkmn.name);
                });

                axios
                    .all(promises)
                    .then(cachePkmnList => {
                        // For each Pokemon not in the cache (i.e. response value is null), fetch from the API.
                        // Then extract the data to the array
                        cachePkmnList = cachePkmnList.map((pkmn, index) => {
                            if (!pkmn) {
                                return getPkmn(pkmnList[index].name).then(resp => resp.data);
                            }

                            return pkmn;
                        });

                        // Wait until all the Pokemon have their data first
                        return axios.all(cachePkmnList);
                    })
                    .then(cachePkmnList => {
                        // Cache each Pokemon's data into storage
                        cachePkmnList.forEach(pkmnData => {
                            storeCachePkmn(pkmnData.name, pkmnData);
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

    /**
     * Fetches the Pokemon's data.
     * @param {str} name: The Pokemon's name.
     */
    cachePkmn(name) {
        return fetch("http://pokeapi.co/api/v2/pokemon/" + name);
    }

}

export default PkmnList;

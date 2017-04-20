import React, { Component, PropTypes } from "react";
import Immutable from "immutable";
import axios from "axios";
import { getPkmn, getPkmnList } from "./support/api";
import { storeCachePkmn, getCachePkmn } from "./support/cache";
import { Button, Card } from "./../components/";

class PkmnList extends Component {
    constructor() {
        super();

        this.state = {
            offset: 0,
            limit: 18,
            pkmnInfo: []
        };
    }

    componentDidMount() {
        this.getPkmn();
    }

    render() {
        // Set up the cards
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

                <div className="col-md-12">
                    <Button name="Show more" classes="btn--showMore" click={ this.getPkmn.bind(this) } />
                </div>
            </div>
        );
    }


    getPkmn() {
        const { offset } = this.state;

        // Get the Pokemon list
        getPkmnList(offset)
            .then(resp => {
                const pkmnList = resp.data.results;

                // With the Pokemon list, fetch from the cache
                const promises = pkmnList.map(pkmn => {
                    return getCachePkmn(pkmn.name);
                });

                return axios
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

                            return cachePkmnList;
                        });
            })
            .then(cachePkmnList => {
                // With the entire list, set the state to show in the page view
                this.setState({
                    pkmnInfo: this.state.pkmnInfo.concat(cachePkmnList),
                    offSet: this.state.offset += this.state.limit
                });
            });
    }
}

export default PkmnList;

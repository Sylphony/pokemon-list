import React, { Component } from "react";
import axios from "axios";
import { getPkmn, getPkmnList } from "./support/api";
import { storeCachePkmn, getCachePkmn } from "./support/cache";
import { Button, Card, Loading } from "./../components/";

class PkmnList extends Component {
    constructor() {
        super();

        this.state = {
            offset: 0,
            limit: 9,
            pkmnInfo: [],
            loading: false
        };
    }

    componentDidMount() {
        this.getPkmn();
    }

    render() {
        // Set up the cards
        const allCards = this.state.pkmnInfo.map(pkmn => {
            const pkmnTypes = pkmn.types.map(info => info.type.name).reverse();

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
                    <Loading hide={ !this.state.loading } />
                    <Button name="Show more" classes={ ["btn--showMore", { "btn--hide": this.state.loading }] } click={ this.getPkmn.bind(this) } />
                </div>
            </div>
        );
    }


    /**
     * Get the Pokemon list (in increments).
     */
    getPkmn() {
        const { offset, limit } = this.state;

        this.setState({
            loading: true
        });

        // Get the Pokemon list
        getPkmnList(offset, limit)
            .then(resp => {
                const pkmnList = resp.data.results;

                // With the Pokemon list, fetch from the cache
                const promises = pkmnList.map(pkmn => getCachePkmn(pkmn.name));

                return axios.all([axios.all(promises), pkmnList]);
            })
            .then(([cachePkmnList, pkmnList]) => {
                // For each Pokemon not in the cache (i.e. response value is null), fetch from the API.
                // Then extract the data to the array
                cachePkmnList = cachePkmnList.map((pkmn, index) => {
                    return (!pkmn) ? getPkmn(pkmnList[index].name).then(resp => resp.data) : pkmn;
                });

                // Wait until all the Pokemon have their data first
                return axios.all(cachePkmnList);
            })
            .then(cachePkmnList => {
                // Cache each Pokemon's data into storage
                cachePkmnList.forEach(pkmnData => storeCachePkmn(pkmnData.name, pkmnData));

                return cachePkmnList;
            })
            .then(cachePkmnList => {
                // With the entire list, set the state to show in the page view
                this.setState({
                    pkmnInfo: this.state.pkmnInfo.concat(cachePkmnList),
                    offset: this.state.offset + this.state.limit,
                    loading: false
                });
            });
    }
}

export default PkmnList;

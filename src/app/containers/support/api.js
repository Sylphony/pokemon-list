import axios from "axios";

/**
 * Get Pokemon.
 * @param {str/num} name: The Pokemon's name.
 * @return {Promise}: The response.
 */
const getPkmn = (name, url) => {
    if (url) {
        return axios.get(url);
    }

    return axios.get(`//pokeapi.co/api/v2/pokemon/${name}/`);
};

/**
 * Get Pokemon list from API.
 * @param {num} [offset = 0]: Where to start the fetch.
 * @param {num} [limit = 18]: Number of results.
 * @return {Promise}: The response.
 */
const getPkmnList = (offset = 0, limit = 18) => {
    return axios.get(`//pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
};

export {
    getPkmn,
    getPkmnList
};

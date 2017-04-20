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

    return axios.get(`http://pokeapi.co/api/v2/pokemon/${name}/`);
};

/**
 * Get Pokemon list from API.
 * @param {num} [limit = 5]: Number of results.
 * @param {num} [offset = 0]: Where to start the fetch.
 * @return {Promise}: The response.
 */
const getPkmnList = (limit = 18, offset = 0) => {
    return axios.get(`http://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
};

export {
    getPkmn,
    getPkmnList
};

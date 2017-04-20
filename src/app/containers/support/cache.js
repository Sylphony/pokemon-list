import localforage from "localforage";

/**
 * Store Pokemon data into cache.
 * @param {str} name: The Pokemon's name.
 * @param {str} data: The Pokemon's data.
 * @return {Promise}: A promise.
 */
const storeCachePkmn = (name, data) => {
    return localforage.setItem(name, data);
};

/**
 * Get Pokemon data from cache.
 * @param {str} name: The Pokemon's name.
 * @return {Promise}: A promise.
 */
const getCachePkmn = (name) => {
    return localforage.getItem(name);
};

/**
 * Get all Pokemon data from cache.
 * @return {Promise}: A promise.
 */
const getCachePkmnList = () => {
    return localforage.keys();
};


export {
    storeCachePkmn,
    getCachePkmn,
    getCachePkmnList
};

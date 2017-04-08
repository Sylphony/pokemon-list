/**
 * Capitalize a string.
 * @param {str} str: The string.
 * @return {str}: A string that is uppercased if input was a string.
 */
export default function captialize(str) {
    if (typeof str === "string") {
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    }
}

export default function captialize(str) {
    if (str) {
        const charCode = str.charCodeAt(0);
        const capitalLetter = String.fromCharCode(charCode - 32);

        return capitalLetter + str.slice(1);
    }
}

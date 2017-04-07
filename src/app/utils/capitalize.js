export default function captialize(str) {
    if (typeof str === "string") {
        return str.replace(/^[a-z]/gi, (match, offset, string) => {
            return match.toUpperCase();
        });
    }
}

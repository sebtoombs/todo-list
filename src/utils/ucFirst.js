/**
 * ucFirst
 *
 * Helper to capitalise the first letter of a string
 *
 * @param {*} string
 */
export default function ucFirst(string) {
  if (!string || !string.length) return "";
  return (
    string.charAt(0).toUpperCase() +
    (string.length > 1 ? string.substr(1).toLowerCase() : "")
  );
}

/**
 * Convert a string in Sentence Case to Camel Case.
 * @param {string} sentenceCase
 * @returns {string}
 */
export function toCamelCase(sentenceCase) {
    return sentenceCase.replace(/\b\w/g, match => match.toUpperCase()).replace(/\s+/g, '');
}

/**
 * Convert a string in Camel or Pascal Case to Sentence Case.
 * @param {string} camelCase
 * @returns {string}
 */
export function toSentenceCase(camelCase) {
    const spacedString = camelCase.replace(/([a-z])([A-Z])/g, '$1 $2');

    return spacedString.charAt(0).toUpperCase() + spacedString.slice(1);
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

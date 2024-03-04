/**
 * Receives an object with boolean values ​​and returns an array of strings with the keys of the true booleans.
 * @param {object} obj The simple object with boolean values.
 * @returns An array containing the keys of the true booleans, if any error is found in the parameters, an empty array will be returned.
 */
export default function booleanObjectToArray(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return [];
    }

    const result = [];
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (typeof value !== 'boolean') {
                return [];
            }
            if (value === true) {
                result.push(key);
            }
        }
    }

    return result;
}

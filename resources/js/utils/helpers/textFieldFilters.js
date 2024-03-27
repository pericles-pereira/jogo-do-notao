/**
 * Receives a setData function from Inertia forms (useForm) and returns an object containing functions to use custom text field filters that are already applied to the input and changed in the form data.
 *
 * Attention, when using this function as a filter, the name of the input field must be the same as the property linked to it in Inertia's useForm.
 * @param setData The setData function of inertia forms (useForm).
 * @returns An object containing filter functions.
 */
export const textFieldFilters = (setData) => {
    const filter = ({ name, value }, filter) => {
        if (filter.test(value)) {
            setData(name, value.replace(filter, ""));
            return;
        }

        setData(name, value);
    };

    return {
        text: (e) => filter(e.target, /[^\p{L}\d\s,.-]/gu),
        email: (e) => filter(e.target, /[^\p{L}\d@._-]/gu),
        letters: (e) => filter(e.target, /[^a-zA-Z]/g),
        numbers: (e) => filter(e.target, /[^\d]/g),
        numbersDotAndHyphen: (e) => filter(e.target, /[^\d.-]/g),
        numbersLettersDotAndHyphen: (e) => filter(e.target, /[^\d\w.-]+/),
        numbersDotHyphenAndParentheses: (e) => filter(e.target, /[^\d.\-(\)]+/),
        numbersDotHyphenSlashAndBackslash: (e) => filter(e.target, /[^\d.\-/\\]/g),
    };
};

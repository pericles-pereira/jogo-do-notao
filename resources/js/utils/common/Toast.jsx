import { Bounce, ToastContainer } from "react-toastify";
import { toast as toastToastify } from "react-toastify";

export const toast = {
    /**
     * Sets a friendly success message to the user.
     * @param {string} message Message to notify the user.
     */
    success: (message) => toastToastify.success(message),
    /**
     * Sets a friendly error message to the user.
     * @param {string} message Message to notify the user.
     */
    error: (message) => toastToastify.error(message),
    /**
     * Sets a friendly info message to the user.
     * @param {string} message Message to notify the user.
     */
    info: (message) => toastToastify.info(message),
    /**
     * Sets a friendly warning message to the user.
     * @param {string} message Message to notify the user.
     */
    warn: (message) => toastToastify.warn(message),
}

export function ToastComponent() {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
    );
}

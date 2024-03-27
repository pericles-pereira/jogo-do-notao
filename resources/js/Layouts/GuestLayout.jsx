import ApplicationLogo from "@/Components/Logo/ApplicationLogo";
import { ToastComponent, toast } from "@/utils/common/Toast";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

export default function Guest({ children, title = "" }) {
    const status = usePage().props?.status;

    React.useEffect(() => {
        if (status && status.type) {
            if (["success", "error", "info", "warn"].includes(status.type)) {
                toast[status.type](status?.message ?? "");
            }
        }
    }, [status]);

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <Head title={title} />
            <ToastComponent />
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-60 fill-current text-gray-500" />
                </Link>
            </div>

            <div
                className="w-full sm:max-w-md mt-4 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
                style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)" }}
            >
                {children}
            </div>
        </div>
    );
}

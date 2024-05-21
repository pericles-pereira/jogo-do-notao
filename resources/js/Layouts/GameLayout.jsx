import { ToastComponent, toast } from "@/utils/common/Toast";
import { Head, usePage } from "@inertiajs/react";
import React from "react";
import background from "@/assets/images/backgorunds/game.webp";
import "react-toastify/dist/ReactToastify.css";

export default function GameLayout({ children, title = "" }) {
    const status = usePage().props?.status;

    React.useEffect(() => {
        if (status && status.type) {
            if (["success", "error", "info", "warn"].includes(status.type)) {
                toast[status.type](status?.message ?? "");
            }
        }
    }, [status]);

    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center align-middle pt-6 bg-gray-100"
            style={{
                backgroundColor: "#D8D7D7",
                backgroundPosition: "center",
                opacity: "0.85",
            }}
        >
            <Head title={title} />
            <ToastComponent />

            {children}
        </div>
    );
}

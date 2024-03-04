import { useLoader } from "@/Context/LoaderContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useEffect } from "react";

export default function Dashboard() {
    const { showLoader, hideLoader } = useLoader();

    const simulateLoading = async () => {
        showLoader(); // Mostra o indicador de carregamento
        try {
            // Simula uma chamada assíncrona
            await new Promise((resolve) => setTimeout(resolve, 5000));
        } finally {
            hideLoader(); // Esconde o indicador de carregamento, independentemente do resultado da chamada
        }
    };
    useEffect(() => {
        // simulateLoading();
    }, []);

    return (
        <AuthenticatedLayout title="Dashboard" >

        </AuthenticatedLayout>
    );
}

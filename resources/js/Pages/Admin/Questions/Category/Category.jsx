import CrudTable from "@/Components/Tables/CrudTable/CrudTable";
import ModalFields from "./partials/ModalFields";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Category({ categories }) {
    const initialFormProps = {
        name: "",
    };

    const columns = [
        {
            accessorKey: "name",
            header: "Categoria",
        },
    ];

    const headers = {
        title: {
            create: "Adicionar Nova Categoria",
            edit: "Editar Categoria",
        },
        subtitle: {
            create: "Por favor, informe os dados da nova categoria.",
            edit: "Atualize os dados desta categoria.",
        },
    };
    return (
        <AuthenticatedLayout title="Categorias">
            <CrudTable
                relativeZiggyRoute="category"
                initialFormProps={initialFormProps}
                tableColumns={columns}
                tableData={categories}
                ModalFields={ModalFields}
                headers={headers}
            />
        </AuthenticatedLayout>
    );
}

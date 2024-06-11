import CrudTable from "@/Components/Tables/CrudTable/CrudTable";
import ModalFields from "./partials/ModalFields";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Discipline({ disciplines }) {
    const initialFormProps = {
        name: "",
    };

    const columns = [
        {
            accessorKey: "name",
            header: "Disciplina",
        },
    ];

    const headers = {
        title: {
            create: "Adicionar Nova Disciplina",
            edit: "Editar Disciplina",
        },
        subtitle: {
            create: "Por favor, informe os dados da nova disciplina.",
            edit: "Atualize os dados desta disciplina.",
        },
    };
    return (
        <AuthenticatedLayout title="Disciplinas">
            <CrudTable
                relativeZiggyRoute="discipline"
                initialFormProps={initialFormProps}
                tableColumns={columns}
                tableData={disciplines}
                ModalFields={ModalFields}
                headers={headers}
            />
        </AuthenticatedLayout>
    );
}

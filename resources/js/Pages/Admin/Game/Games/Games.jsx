import CrudTable from "@/Components/Tables/CrudTable/CrudTable";
import ModalFields from "./partials/ModalFields";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Games({ games, questions }) {
    const initialFormProps = {
        name: "",
        questions: [],
    };

    const columns = [
        {
            accessorKey: "name",
            header: "Nome do Jogo",
        },
    ];

    const headers = {
        title: {
            create: "Adicionar Novo Jogo",
            edit: "Editar Jogo",
        },
        subtitle: {
            create: "Por favor, informe os dados do novo jogo.",
            edit: "Atualize os dados deste jogo.",
        },
    };
    return (
        <AuthenticatedLayout title="Gerenciar Jogos">
            <CrudTable
                relativeZiggyRoute="game.manage"
                initialFormProps={initialFormProps}
                tableColumns={columns}
                tableData={games}
                ModalFields={ModalFields}
                headers={headers}
                questions={questions}
            />
        </AuthenticatedLayout>
    );
}

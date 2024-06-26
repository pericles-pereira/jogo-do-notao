import CrudTable from "@/Components/Tables/CrudTable/CrudTable";
import ModalFields from "./partials/ModalFields";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Questions({ questions, disciplines }) {
    const initialFormProps = {
        title: "",
        theme: "",
        statement: "",
        correctOption: "",
        wrongOption1: "",
        wrongOption2: "",
        wrongOption3: "",
        wrongOption4: "",
        disciplineId: "",
        difficulty: "",
    };

    const columns = [
        {
            accessorKey: "discipline",
            header: "Disciplina",
            filterVariant: "select",
        },
        {
            accessorKey: "theme",
            header: "Tema",
            filterVariant: "select",
        },
        {
            accessorKey: "difficulty",
            header: "Dificuldade",
            filterVariant: "select",
        },
        {
            accessorKey: "title",
            header: "Questão",
        },
    ];

    const headers = {
        title: {
            create: "Adicionar Nova Questão",
            edit: "Editar Questão",
        },
        subtitle: {
            create: "Por favor, informe os dados da nova questão.",
            edit: "Atualize os dados desta questão.",
        },
    };

    return (
        <AuthenticatedLayout title="Questões">
            <CrudTable
                relativeZiggyRoute="questions"
                initialFormProps={initialFormProps}
                tableColumns={columns}
                tableData={questions}
                ModalFields={ModalFields}
                headers={headers}
                disciplines={disciplines}
                tableOptions={{
                    enableFacetedValues: true,
                    initialState: { showColumnFilters: true },
                }}
            />
        </AuthenticatedLayout>
    );
}

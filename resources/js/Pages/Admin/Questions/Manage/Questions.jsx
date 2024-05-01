import CrudTable from "@/Components/Tables/CrudTable/CrudTable";
import ModalFields from "./partials/ModalFields";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Questions({ questions, categories }) {
    const initialFormProps = {
        statement: "",
        correctOption: "",
        wrongOption1: "",
        wrongOption2: "",
        wrongOption3: "",
        wrongOption4: "",
        categoryId: "",
        difficulty: "",
    };

    const columns = [
        {
            accessorKey: "category",
            header: "Categoria",
            filterVariant: "select",
        },
        {
            accessorKey: "difficulty",
            header: "Dificuldade",
            filterVariant: "select",
        },
        {
            accessorKey: "statement",
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
                categories={categories}
                tableOptions={{
                    enableFacetedValues: true,
                    initialState: { showColumnFilters: true },
                }}
            />
        </AuthenticatedLayout>
    );
}

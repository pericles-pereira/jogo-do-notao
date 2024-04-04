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
        },
        {
            accessorKey: "difficulty",
            header: "Dificuldade",
            Cell: ({ cell }) => (
                <div>
                    {Number(cell.getValue()) === 1 && "Muito Fácil"}
                    {Number(cell.getValue()) === 2 && "Fácil"}
                    {Number(cell.getValue()) === 3 && "Intermediário"}
                    {Number(cell.getValue()) === 4 && "Difícil"}
                    {Number(cell.getValue()) === 5 && "Muito Difícil"}
                    {Number(cell.getValue()) === 6 && "Impossível"}
                </div>
            ),
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
            />
        </AuthenticatedLayout>
    );
}

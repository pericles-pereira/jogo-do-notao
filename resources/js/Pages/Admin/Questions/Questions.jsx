import CrudTable from "@/Components/Tables/CrudTable/CrudTable";
import ModalFields from "./partials/ModalFields";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Questions({  }) {
    const initialFormProps = {
        code: "",
        name: "",
        installments: undefined,
        term: undefined,
    };

    const columns = [
        {
            accessorKey: "code",
            header: "Código",
        },
        {
            accessorKey: "name",
            header: "Descrição",
        },
        {
            accessorKey: "installments",
            header: "Número de Parcelas",
        },
        {
            accessorKey: "term",
            header: "Prazo de Cobrança",
        },
    ];

    const headers = {
        title: {
            create: "Adicionar Nova Forma de Pagamento",
            edit: "Editar Forma de Pagamento",
        },
        subtitle: {
            create: "Por favor, informe os dados da nova forma de pagamento.",
            edit: "Atualize os dados desta forma de pagamento.",
        },
    };
    return (
        <AuthenticatedLayout title="Questões">
            <CrudTable
                relativeZiggyRoute="payments.payment-methods"
                initialFormProps={initialFormProps}
                tableColumns={columns}
                tableData={[]}
                ModalFields={ModalFields}
                headers={headers}
            />
        </AuthenticatedLayout>
    );
}

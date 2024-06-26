import CrudTable from "@/Components/Tables/CrudTable/CrudTable";
import ModalFields from "./partials/ModalFields";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowLeft, Check, East, Visibility, West } from "@mui/icons-material";
import {
    Box,
    Button,
    IconButton,
    Modal,
    Paper,
    Tooltip,
    Typography,
} from "@mui/material";
import { useState } from "react";

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

    const [viewQuestionData, setViewQuestionData] = useState({});
    const [openViewQuestion, setOpenViewQuestion] = useState(false);

    const handleOpenViewQuestion = (data) => {
        setViewQuestionData(data);
        setOpenViewQuestion(true);
    };

    const handleCloseViewQuestion = () => {
        setOpenViewQuestion(false);
        setViewQuestionData({});
    };

    const columns = [
        {
            id: "1",
            header: "",
            enableColumnActions: false,
            enableColumnDragging: false,
            enableColumnFilter: false,
            enableColumnOrdering: false,
            enableSorting: false,
            size: 10,
            Cell: ({ cell }) => (
                <div>
                    <Tooltip title="Ver Questão">
                        <IconButton
                            onClick={() =>
                                handleOpenViewQuestion(cell.row.original)
                            }
                        >
                            <Visibility
                                color="secondary"
                                sx={{ fontSize: "28px" }}
                            />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
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

            <Modal
                open={openViewQuestion}
                onClose={handleCloseViewQuestion}
                disableAutoFocus
                className="pt-14 overflow-y-auto xl:max-w-4xl mx-auto"
            >
                <Paper
                    elevation={3}
                    className="w-auto flex flex-col justify-center items-center p-4 mx-auto"
                >
                    <Typography variant="h5">
                        {viewQuestionData?.title}
                    </Typography>
                    <Box className="flex flex-row gap-9 flex-wrap mt-2">
                        <Typography variant="body1">
                            <span className="font-bold">Tema:</span>{" "}
                            {viewQuestionData?.theme}
                        </Typography>
                        <Typography variant="body1">
                            <span className="font-bold">Dificuldade:</span>{" "}
                            {viewQuestionData?.difficulty}
                        </Typography>
                        <Typography variant="body1">
                            <span className="font-bold">Disciplina:</span>{" "}
                            {viewQuestionData?.discipline}
                        </Typography>
                    </Box>
                    <Typography variant="h6" className="pt-4">
                        {viewQuestionData?.statement}
                    </Typography>
                    <Box className="flex flex-col justify-start w-full gap-2 mt-2">
                        <Typography variant="body1">
                            <span className="font-bold">1-</span>{" "}
                            {viewQuestionData?.correctOption}{" "}
                            <Check
                                color="success"
                                sx={{ fontSize: "34px" }}
                                className="pb-2"
                            />
                        </Typography>
                        <Typography variant="body1">
                            <span className="font-bold">2-</span>{" "}
                            {viewQuestionData?.wrongOption1}
                        </Typography>
                        <Typography variant="body1">
                            <span className="font-bold">3-</span>{" "}
                            {viewQuestionData?.wrongOption2}
                        </Typography>
                        <Typography variant="body1">
                            <span className="font-bold">4-</span>{" "}
                            {viewQuestionData?.wrongOption3}
                        </Typography>
                        <Typography variant="body1">
                            <span className="font-bold">5-</span>{" "}
                            {viewQuestionData?.wrongOption4}
                        </Typography>
                    </Box>

                    <Box className="flex justify-start w-full mt-5">
                        <Button
                            variant="contained"
                            onClick={handleCloseViewQuestion}
                            startIcon={<West/>}
                        >
                            <Typography
                                variant="body1"
                                sx={{ textTransform: "none" }}
                            >
                                Voltar
                            </Typography>
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </AuthenticatedLayout>
    );
}

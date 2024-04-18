import React, { useMemo, useState } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import {
    Container,
    Grid,
    Button,
    Typography,
    Modal,
    Paper,
} from "@mui/material";
import { Add, Create, Delete } from "@mui/icons-material";
import { useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import { toast } from "@/utils/common/Toast";

const paperStyle = {
    padding: "24px",
    minWidth: "1000px",
    maxHeight: "90vh",
    "@media (max-width: 1200px)": {
        minWidth: "800px",
    },
    "@media (max-width: 900px)": {
        minWidth: "600px",
    },
    "@media (max-width: 600px)": {
        minWidth: "100%",
    },
};

export default function CrudTable({
    tableData,
    tableColumns,
    initialFormProps = null,
    relativeZiggyRoute = "",
    headers = null,
    ModalFields = null,
    renderActions = true,
    actions = null,
    rowSelection = true,
    ...modalProperties
}) {
    const [refreshData, setRefreshData] = useState(false);

    const [open, setOpen] = useState(false);
    const [openConfirmDeletion, setOpenConfirmDeletion] = useState(false);
    const [inEdit, setInEdit] = useState(false);

    const data = useMemo(() => tableData, [refreshData]);
    const columns = useMemo(() => tableColumns, []);

    const form = useForm(initialFormProps);
    const excludeForm = useForm({});

    const ziggyRoute = relativeZiggyRoute.endsWith(".")
        ? relativeZiggyRoute.slice(0, -1)
        : relativeZiggyRoute;

    const openModal = () => setOpen(true);

    const closeModal = () => {
        table.resetRowSelection();
        setOpen(false);
        if (inEdit) {
            form.reset();
            setInEdit(false);
        }
    };

    const openConfirmDeletionModal = () => {
        if (table.getSelectedRowModel().rows.length === 0) {
            toast.warn("Selecione alguma linha para excluir.");
            return;
        }
        setOpen(false);
        setOpenConfirmDeletion(true);
    };

    const closeConfirmDeletionModal = () => setOpenConfirmDeletion(false);

    const table = useMaterialReactTable({
        columns,
        data,
        localization: MRT_Localization_PT_BR,
        enableRowSelection: rowSelection,
        enableColumnOrdering: true,
        enableGlobalFilter: true,
        enableFullScreenToggle: false,
        enableClickToCopy: false,
        muiTablePaperProps: { sx: { padding: "4px 4px 0px 4px" } },
        muiTableProps: { sx: { width: "100%", minWidth: "750px" } },
        muiTableBodyCellProps: {
            sx: { textAlign: "center", fontWeight: 450 },
        },
        muiSelectAllCheckboxProps: { sx: { textAlign: "center" } },
        muiTableHeadCellProps: { sx: { textAlign: "center" } },
        renderTopToolbarCustomActions: () => (
            <Grid
                item
                sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
            >
                {renderActions && (
                    <>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            type="button"
                            onClick={openModal}
                        >
                            <Typography variant="subtitle2">Criar</Typography>
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Create />}
                            type="button"
                            color="info"
                            onClick={edit}
                        >
                            <Typography variant="subtitle2">Editar</Typography>
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Delete />}
                            color="error"
                            type="button"
                            onClick={openConfirmDeletionModal}
                        >
                            <Typography variant="subtitle2">Excluir</Typography>
                        </Button>
                    </>
                )}
                {actions && actions}
            </Grid>
        ),
    });

    const getRows = ({ forExclusion } = { forExclusion: false }) => {
        const rows = table.getSelectedRowModel().rows;
        let invalid = false;

        if (rows.length === 0) {
            toast.warn(
                `Selecione alguma linha para ${
                    forExclusion ? "excluir" : "editar"
                }.`
            );
            invalid = true;
        }

        if (!forExclusion) {
            if (rows.length > 1) {
                toast.warn("Selecione apenas 1 linha para editar.");
                invalid = true;
            }
        }

        if (invalid) return null;

        return forExclusion
            ? rows.map((row) => ({
                  id: row.original.id,
              }))
            : rows[0].original;
    };

    const submit = (e) => {
        e.preventDefault();

        const dateFields = [];

        for (const key in form.data) {
            if (key.toLowerCase().includes("date")) dateFields.push(key);
        }

        const today = dayjs();

        form.clearErrors();
        let exit = false;
        Object.keys(initialFormProps).forEach((key) => {
            const currentData = form.data[key];

            if (
                key === "cnpj" &&
                form.data.cnpj.replace(/[^\d]/g, "").length < 14
            ) {
                form.setError(key, "Informe os 14 dígitos do CNPJ.");
                exit = true;
            }

            if (
                key === "rg" &&
                form.data.rg.replace(/[^\d]/g, "").length < 10
            ) {
                form.setError(key, "Informe os 10 dígitos do RG.");
                exit = true;
            }

            if (
                key === "ctps" &&
                form.data.ctps.replace(/[^\d]/g, "").length < 11
            ) {
                form.setError(key, "Informe os 11 dígitos da CTPS.");
                exit = true;
            }

            if (
                key === "cep" &&
                form.data.cep.replace(/[^\d]/g, "").length < 8
            ) {
                form.setError(key, "Informe os 8 dígitos do CEP.");
                exit = true;
            }

            if (
                key === "phone" &&
                form.data.phone.replace(/[^\d]/g, "").length < 10
            ) {
                form.setError(key, "Informe os 10 dígitos do Telefone.");
                exit = true;
            }

            if (dateFields.includes(key)) {
                if (currentData.isAfter(today, "day")) {
                    form.setError(key, "Informe uma data válida.");
                    exit = true;
                }
            }
        });

        if (exit) return;

        if (inEdit) {
            form.patch(route(`${ziggyRoute}.update`), {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    form.reset();
                    setRefreshData(!refreshData);
                    table.resetRowSelection();
                },
            });
            return;
        }

        form.post(route(`${ziggyRoute}.store`), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                form.reset();
                setRefreshData(!refreshData);
            },
        });
    };

    const edit = () => {
        const data = getRows();

        if (!data) return;

        const editData = { ...data };

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const lowerKey = key.toLowerCase();
                if (lowerKey.includes("date")) {
                    editData[key] = dayjs(data[key]);
                }
            }
        }

        setInEdit(true);
        form.setData({ ...editData });
        openModal({ ...editData });
    };

    const exclude = () => {
        const data = getRows({ forExclusion: true });

        if (!data) return;

        excludeForm.delete(
            route(`${ziggyRoute}.delete`, { deleteData: data }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    form.reset();
                    setRefreshData(!refreshData);
                    table.resetRowSelection();
                    closeConfirmDeletionModal();
                },
            }
        );
    };

    const title = headers?.title;
    const subtitle = headers?.subtitle;

    return (
        <>
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Grid container justifyContent="center">
                    <div style={{ display: "grid" }}>
                        <MaterialReactTable table={table} />
                    </div>

                    <Modal
                        open={open}
                        onClose={closeModal}
                        className="flex justify-center items-center w-full h-full overflow-auto"
                    >
                        <form onSubmit={submit}>
                            <Paper
                                className="p-6 xl:m-12 overflow-auto"
                                sx={paperStyle}
                            >
                                <Typography variant="h6">
                                    {inEdit ? title?.edit : title?.create}
                                </Typography>
                                <Typography variant="body1">
                                    {inEdit ? subtitle?.edit : subtitle?.create}
                                </Typography>

                                {ModalFields && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
                                        <div className="md:col-span-2">
                                            <div className="flex flex-wrap">
                                                <ModalFields
                                                    data={form.data}
                                                    setData={form.setData}
                                                    errors={form.errors}
                                                    reset={form.reset}
                                                    {...modalProperties}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between mt-5">
                                    <Button
                                        color="success"
                                        type="submit"
                                        variant="contained"
                                        disabled={form.processing}
                                    >
                                        Salvar
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        onClick={closeModal}
                                    >
                                        Sair
                                    </Button>
                                </div>
                            </Paper>
                        </form>
                    </Modal>

                    <Modal
                        open={openConfirmDeletion}
                        onClose={closeConfirmDeletionModal}
                        className="flex justify-center items-center w-full h-full overflow-auto"
                    >
                        <Paper
                            className="p-6 xl:m-12 overflow-auto"
                            sx={{ padding: "24px" }}
                        >
                            <Typography variant="h6">
                                Confirmar Exclusão de Registros
                            </Typography>
                            <Typography variant="body1">
                                Você tem certeza que deseja excluir
                                permanentemente os registros selecionados?
                            </Typography>

                            <div className="flex justify-between mt-8">
                                <Button
                                    color="error"
                                    type="button"
                                    onClick={exclude}
                                    variant="contained"
                                    disabled={form.processing}
                                >
                                    Sim, excluir registros
                                </Button>

                                <Button
                                    variant="contained"
                                    color="inherit"
                                    onClick={closeConfirmDeletionModal}
                                >
                                    Sair
                                </Button>
                            </div>
                        </Paper>
                    </Modal>
                </Grid>
            </Container>
            <style>{`
                .Mui-TableHeadCell-Content {
                    display: flex;
                    justify-content: center;
                }
                .MuiInputBase-input:focus {
                    outline: none;
                    border-color: transparent;
                    box-shadow: none;
                }
            `}</style>
        </>
    );
}

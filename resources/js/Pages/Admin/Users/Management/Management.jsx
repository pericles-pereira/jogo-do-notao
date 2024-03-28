import React, { useMemo, useRef } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Container, Grid, Chip, Button, Typography } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";
import { Print, TableView } from "@mui/icons-material";
import exportToCSV from "@/utils/helpers/exportToCSV";
import booleanObjectToArray from "@/utils/helpers/booleanObjectToArray";
import { toSentenceCase } from "@/utils/common/strings";
import { router } from "@inertiajs/react";

export default function Management({ users }) {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const data = useMemo(
        () =>
            users.map((user) => ({
                ...user,
                createdAt: user.createdAt === null ? "--" : user.createdAt,
                emailVerifiedAt:
                    user.emailVerifiedAt === null ? "--" : user.emailVerifiedAt,
                permissions: booleanObjectToArray(user.permissions).map(
                    (string) => toSentenceCase(string)
                ),
            })),
        []
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Nome",
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "group",
                header: "Grupo",
            },
            {
                accessorKey: "createdAt",
                header: "Data de Criação",
            },
            {
                accessorKey: "permissions",
                header: "Permissões",
                Cell: ({ cell }) => (
                    <div>
                        {cell.getValue().map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                variant="outlined"
                                color="primary"
                                style={{ margin: "2px" }}
                            />
                        ))}
                    </div>
                ),
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data,
        localization: MRT_Localization_PT_BR,
        enableRowSelection: true,
        enableColumnOrdering: true,
        enableGlobalFilter: true,
        enableFullScreenToggle: false,
        enableClickToCopy: false,
        selectAllMode: "all",
        muiTablePaperProps: { sx: { padding: "4px 4px 0px 4px" } },
        muiTableProps: { sx: { width: "100%", minWidth: "750px" } },
        muiTableBodyCellProps: {
            sx: { textAlign: "center", cursor: "pointer", fontWeight: 500 },
        },
        muiSelectAllCheckboxProps: { sx: { textAlign: "center" } },
        muiTableHeadCellProps: { sx: { textAlign: "center" } },
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => router.visit(route("users.show", row.original?.id)),
        }),
        renderTopToolbarCustomActions: () => (
            <Grid
                item
                sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
            >
                <CSVLink
                    data={exportToCSV(table)}
                    filename={"users.csv"}
                    separator=";"
                >
                    <Button variant="contained" startIcon={<TableView />}>
                        <Typography variant="subtitle2">CSV</Typography>
                    </Button>
                </CSVLink>
                <Button
                    variant="contained"
                    onClick={handlePrint}
                    startIcon={<Print />}
                >
                    <Typography variant="subtitle2">Print</Typography>
                </Button>
            </Grid>
        ),
    });

    return (
        <AuthenticatedLayout title="Usuários">
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Grid container justifyContent="center">
                    <div ref={componentRef} style={{ display: "grid" }}>
                        <MaterialReactTable table={table} />
                    </div>
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
        </AuthenticatedLayout>
    );
}

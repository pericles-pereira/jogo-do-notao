import React, { useEffect, useMemo, useRef } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Container, Grid, Chip, Button, Typography } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";
import { Print, TableView } from "@mui/icons-material";
import exportToCSV from "@/utils/helpers/exportToCSV";
import booleanObjectToArray from "@/utils/helpers/booleanObjectToArray";
import { toSentenceCase } from "@/utils/common/strings";
import { toast } from "react-toastify";
import { router } from "@inertiajs/react";

export default function Management({ status, users }) {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        if (status && status.type) toast[status.type](status?.message);
    }, [status]);

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
                header: "Name",
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "createdAt",
                header: "Creation Date",
            },
            {
                accessorKey: "emailVerifiedAt",
                header: "Verification Date",
            },
            {
                accessorKey: "permissions",
                header: "Permissions",
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
        muiFilterTextFieldProps: {
            sx: {
                ":focus": {
                    outline: "none",
                    borderColor: "transparent",
                    boxShadow: "none",
                },
            },
        },
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => router.visit(route("users.show", row.original?.id)),
        }),
        renderTopToolbarCustomActions: () => (
            <Grid
                item
                sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
            >
                <Button variant="contained" startIcon={<TableView />}>
                    <CSVLink
                        data={exportToCSV(table)}
                        filename={"users.csv"}
                        separator=";"
                    >
                        <Typography variant="subtitle2">CSV</Typography>
                    </CSVLink>
                </Button>
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
        <AuthenticatedLayout title="Users">
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
            `}</style>
        </AuthenticatedLayout>
    );
}

import CrudTable from "@/Components/Tables/CrudTable/CrudTable";
import ModalFields from "./partials/ModalFields";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Add, Check, Close, Replay } from "@mui/icons-material";
import { Link } from "@inertiajs/react";

export default function Games({ games, questions, startedGames }) {
    const initialFormProps = {
        name: "",
        acronym: "",
        questions: [],
    };

    const columns = [
        {
            accessorKey: "acronym",
            header: "Sigla",
        },
        {
            accessorKey: "name",
            header: "Nome do Jogo",
        },
    ];

    const startedGamesColumns = [
        {
            accessorKey: "playerName",
            header: "Jogador",
        },
        {
            accessorKey: "roomCode",
            header: "Sala",
        },
        {
            accessorKey: "timer",
            header: "Tempo",
        },
        {
            accessorKey: "game",
            header: "Jogo",
            Cell: ({ cell }) => (
                <div>
                    {
                        games.find(
                            (game) => game.id === cell.row.original.gameId
                        ).acronym
                    }
                </div>
            ),
        },
        {
            accessorKey: "inGame",
            header: "Em Partida",
            Cell: ({ cell }) => (
                <div>
                    {cell.row.original.inGame ? (
                        <Check sx={{ fontSize: "32px" }} color="success" />
                    ) : (
                        <Close sx={{ fontSize: "32px" }} color="error" />
                    )}
                </div>
            ),
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
            <Box className="flex justify-center align-middle w-full mt-4">
                <Typography
                    className="text-center w-auto text-black opacity-90 text-wrap"
                    variant="h5"
                    sx={{ fontWeight: 500 }}
                >
                    Partidas Ativas
                </Typography>
            </Box>
            <Box className="flex justify-center align-middle w-full mt-1">
                <div
                    className="w-60"
                    style={{
                        borderBottom: "1px dashed",
                        borderWidth: "50%",
                    }}
                ></div>
            </Box>
            <CrudTable
                tableColumns={startedGamesColumns}
                tableData={startedGames}
                renderActions={false}
                rowSelection={false}
                actions={
                    <>
                        <Link href={route("game.start")} preserveScroll>
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                type="button"
                            >
                                <Typography variant="subtitle2">
                                    Criar
                                </Typography>
                            </Button>
                        </Link>
                        <Link href={route("game.manage")} preserveScroll>
                            <IconButton>
                                <Replay />
                            </IconButton>
                        </Link>
                    </>
                }
            />

            <Box className="flex justify-center align-middle w-full mt-4">
                <Typography
                    className="text-center w-auto text-black opacity-90 text-wrap"
                    variant="h5"
                    sx={{ fontWeight: 500 }}
                >
                    Partidas Encerradas
                </Typography>
            </Box>
            <Box className="flex justify-center align-middle w-full mt-1">
                <div
                    className="w-64"
                    style={{
                        borderBottom: "1px dashed",
                        borderWidth: "50%",
                    }}
                ></div>
            </Box>
            <CrudTable
                tableColumns={startedGamesColumns}
                tableData={startedGames}
                renderActions={false}
                rowSelection={false}
                actions={
                    <Link href={route("game.manage")} preserveScroll>
                        <IconButton>
                            <Replay />
                        </IconButton>
                    </Link>
                }
            />

            <Box className="flex justify-center align-middle w-full mt-4">
                <Typography
                    className="text-center w-auto text-black opacity-90 text-wrap"
                    variant="h5"
                    sx={{ fontWeight: 500 }}
                >
                    Jogos Disponíveis
                </Typography>
            </Box>
            <Box className="flex justify-center align-middle w-full mt-1">
                <div
                    className="w-60"
                    style={{
                        borderBottom: "1px dashed",
                        borderWidth: "50%",
                    }}
                ></div>
            </Box>

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

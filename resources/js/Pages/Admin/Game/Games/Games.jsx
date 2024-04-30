import CrudTable from "@/Components/Tables/CrudTable/CrudTable";
import ModalFields from "./partials/ModalFields";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { Add, Check, Close, EmojiEvents, Replay, Visibility } from "@mui/icons-material";
import { Link } from "@inertiajs/react";
import StartGame from "./partials/StartGame";
import { formatTime, parseTime } from "@/utils/common/time";

export default function Games({
    games,
    questions,
    startedGames,
    roomCode,
    finishedGames,
}) {
    const initialFormProps = {
        name: "",
        acronym: "",
        questions: [],
        timer: null,
        maximumPoints: null,
    };

    const columns = [
        {
            accessorKey: "acronym",
            header: "Sigla",
            filterVariant: "select",
        },
        {
            accessorKey: "name",
            header: "Nome do Jogo",
        },
        {
            accessorKey: "timer",
            header: "Tempo",
            Cell: ({ cell }) => <div>{cell.getValue().slice(3)}</div>,
        },
        {
            accessorKey: "maximumPoints",
            header: "Pontuação Máxima",
        },
    ];

    const startedGamesColumns = [
        {
            accessorKey: "watch",
            header: "",
            enableColumnActions: false,
            enableColumnDragging: false,
            enableColumnFilter: false,
            enableColumnOrdering: false,
            enableSorting: false,
            size: 10,
            Cell: ({ cell }) => (
                <div>
                    <Link
                        href={route("game.watch", {
                            roomCode: cell.row.original.roomCode,
                        })}
                    >
                        <Tooltip title="Assistir">
                            <IconButton>
                                <Visibility
                                    color="info"
                                    sx={{ fontSize: "28px" }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </div>
            ),
        },
        {
            accessorKey: "playerName",
            header: "Jogador",
        },
        {
            accessorKey: "roomCode",
            header: "Sala",
            filterVariant: "select",
        },
        {
            accessorKey: "game",
            header: "Jogo",
            filterVariant: "select",
        },
        {
            accessorKey: "playing",
            header: "Em Partida",
            Cell: ({ cell }) => (
                <div>
                    {cell.row.original.playing ? (
                        <Check sx={{ fontSize: "32px" }} color="success" />
                    ) : (
                        <Close sx={{ fontSize: "32px" }} color="error" />
                    )}
                </div>
            ),
        },
    ];

    const finishedGamesColumns = [
        {
            accessorKey: "ranking",
            header: "",
            enableColumnActions: false,
            enableColumnDragging: false,
            enableColumnFilter: false,
            enableColumnOrdering: false,
            enableSorting: false,
            size: 10,
            Cell: ({ cell }) => (
                <div>
                    <Link
                        href={route("ranking", {
                            gameAcronym: cell.row.original.game,
                        })}
                    >
                        <Tooltip title="Ranking">
                            <IconButton>
                                <EmojiEvents
                                    color="secondary"
                                    sx={{ fontSize: "28px" }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </div>
            ),
        },
        {
            accessorKey: "playerName",
            header: "Jogador",
        },
        {
            accessorKey: "game",
            header: "Jogo",
            filterVariant: "select",
        },
        {
            accessorKey: "correctResponses",
            header: "Acertos",
            Cell: ({ cell }) => <div>{cell.getValue().length}</div>,
        },
        {
            accessorKey: "points",
            header: "Pontos",
        },
        {
            accessorKey: "inMinutes",
            header: "Tempo",
            Cell: ({ cell }) => (
                <div>
                    {formatTime(
                        cell
                            .getValue()
                            .reduce(
                                (prev, curr) =>
                                    parseTime(prev) + parseTime(curr),
                                0
                            )
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
            <StartGame games={games} roomCode={roomCode} />

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
                    <Link href={route("game.manage")} preserveScroll>
                        <IconButton>
                            <Replay />
                        </IconButton>
                    </Link>
                }
                tableOptions={{
                    enableFacetedValues: true,
                    initialState: { showColumnFilters: true },
                }}
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
                tableColumns={finishedGamesColumns}
                tableData={finishedGames}
                renderActions={false}
                rowSelection={false}
                actions={
                    <Link href={route("game.manage")} preserveScroll>
                        <IconButton>
                            <Replay />
                        </IconButton>
                    </Link>
                }
                tableOptions={{
                    enableFacetedValues: true,
                    initialState: { showColumnFilters: true },
                }}
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
                tableOptions={{
                    enableFacetedValues: true,
                    initialState: { showColumnFilters: true },
                }}
            />
        </AuthenticatedLayout>
    );
}

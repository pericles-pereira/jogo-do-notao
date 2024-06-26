import CrudTable from "@/Components/Tables/CrudTable/CrudTable";
import ModalFields from "./partials/ModalFields";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Modal,
    Paper,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    Check,
    Close,
    EmojiEvents,
    PhonelinkErase,
    Replay,
    Visibility,
} from "@mui/icons-material";
import { Link, useForm } from "@inertiajs/react";
import StartGame from "./partials/StartGame";
import { formatTime, parseTime } from "@/utils/common/time";
import { useState } from "react";

export default function Games({
    games,
    questions,
    startedGames,
    roomCode,
    finishedGames,
    disciplines,
}) {
    const { delete: destroy, processing } = useForm();
    const [openModal, setOpenModal] = useState(false);
    const [modalRoomCode, setModalRoomCode] = useState(null);

    const initialFormProps = {
        name: "",
        acronym: "",
        questions: [],
        timer: null,
        maximumPoints: null,
        disciplineId: "",
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
            accessorKey: "discipline",
            header: "Disciplina",
            filterVariant: "select",
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

    const handleOpenModal = (roomCode) => {
        setModalRoomCode(roomCode);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setModalRoomCode(null);
        setOpenModal(false);
    };

    const startedGamesColumns = [
        {
            accessorKey: "watch",
            header: "",
            enableColumnActions: false,
            enableColumnDragging: false,
            enableColumnFilter: false,
            enableColumnOrdering: false,
            enableSorting: false,
            size: 30,
            Cell: ({ cell }) => (
                <div className="flex">
                    <Link
                        href={route("game.watch", {
                            roomCode: cell.row.original.roomCode,
                        })}
                    >
                        <Tooltip title="Assistir">
                            <IconButton>
                                <Visibility
                                    color="info"
                                    sx={{ fontSize: "26px" }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Tooltip title="Finalizar Jogo">
                        <IconButton
                            onClick={() =>
                                handleOpenModal(cell.row.original.roomCode)
                            }
                        >
                            <PhonelinkErase
                                color="error"
                                sx={{ fontSize: "26px" }}
                            />
                        </IconButton>
                    </Tooltip>
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

    const jogos = 123; // Quantidade de jogos
    const rankingUsuarios = [
        { nome: "Usuário1", jogo: "Jogo1" },
        { nome: "Usuário2", jogo: "Jogo2" },
        { nome: "Usuário3", jogo: "Jogo3" },
        { nome: "Usuário4", jogo: "Jogo4" },
        { nome: "Usuário5", jogo: "Jogo5" },
    ];
    const rankingDisciplinas = ["Disciplina1", "Disciplina2", "Disciplina3"];

    return (
        <AuthenticatedLayout title="Gerenciar Jogos">
            {/* <div className="w-full flex flex-row justify-around flex-wrap gap-4 p-4">
                <Card className="w-auto min-w-64">
                    <CardContent className="bg-blue-600 text-white min-h-72">
                        <Typography variant="body1" component="div">
                            Quantidade de Jogos
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            className="mt-4"
                        >
                            {jogos}
                        </Typography>
                    </CardContent>
                </Card>

                <Card className="w-auto min-w-64">
                    <CardContent className="bg-blue-700 text-white min-h-72">
                        <Typography
                            variant="body1"
                            component="div"
                            className="pt-4"
                        >
                            Disciplinas Mais Jogadas
                        </Typography>
                        <List>
                            {rankingDisciplinas.map((disciplina, index) => (
                                <ListItem key={index}>
                                    <Typography variant="body2" component="div">
                                        {disciplina} - 6464
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>

                <Card className="w-auto min-w-64">
                    <CardContent className="bg-blue-800 text-white min-h-72">
                        <Typography variant="body1" component="div">
                            Ranking de Jogadores
                        </Typography>
                        <List>
                            {rankingUsuarios.map((usuario, index) => (
                                <ListItem key={index}>
                                    <Typography variant="body2" component="div">
                                        {usuario.nome} - {usuario.jogo}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </div> */}

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
                disciplines={disciplines}
            />

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                className="flex justify-center items-center w-full h-full overflow-auto"
            >
                <Paper
                    className="p-6 xl:m-12 overflow-auto"
                    sx={{ padding: "24px" }}
                >
                    <Typography variant="h6">
                        Confirmar Finalização de Jogo
                    </Typography>
                    <Typography variant="body1" component="p">
                        Você tem certeza que deseja finalizar este jogo
                        forçadamente?
                        <p>O jogador manterá seu progresso até agora.</p>
                    </Typography>

                    <div className="flex justify-between mt-8">
                        <Button
                            color="error"
                            type="button"
                            onClick={() => {
                                destroy(
                                    route("game.finish", {
                                        roomCode: modalRoomCode,
                                    }),
                                    {
                                        preserveScroll: true,
                                        onSuccess: handleCloseModal,
                                    }
                                );
                            }}
                            variant="contained"
                            disabled={processing}
                        >
                            Sim, finalizar jogo
                        </Button>

                        <Button
                            variant="contained"
                            color="inherit"
                            onClick={handleCloseModal}
                        >
                            Sair
                        </Button>
                    </div>
                </Paper>
            </Modal>
        </AuthenticatedLayout>
    );
}

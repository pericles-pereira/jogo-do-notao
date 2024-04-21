import GameLayout from "@/Layouts/GameLayout";
import { toast } from "@/utils/common/Toast";
import { Link, useForm } from "@inertiajs/react";
import {
    Button,
    Typography,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemText,
    Modal,
} from "@mui/material";
import { useState, useEffect } from "react";
import universityHelpImage from "@/assets/images/game/universityHelpImage.png";
import excellence from "@/assets/images/game/excellence.png";
import { East } from "@mui/icons-material";
import axios from "axios";
import { formatTime, parseTime } from "@/utils/common/time";
import { capitalizeFirstLetter } from "@/utils/common/strings";

export default function Playing({ question, roomCode, timer, options }) {
    const { data, setData } = useForm({
        roomCode: roomCode,
        response: 99,
    });

    const [timeLeft, setTimeLeft] = useState(parseTime(timer.slice(3)));
    const [timerInterval, setTimerInterval] = useState(null);
    const [sendResponse, setSendResponse] = useState(false);
    const [replySent, setReplySent] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            setTimerInterval(interval);
            return () => clearInterval(interval);
        } else if (timeLeft === 0) {
            toast.error("Tempo esgotado!");
            axios.patch(route("request-university-help.patch"), {
                roomCode: data.roomCode,
                response: data.response,
            });
            setReplySent(true);
        }
    }, [timeLeft]);

    useEffect(() => {
        if (sendResponse) {
            axios
                .patch(route("request-university-help.patch"), {
                    roomCode: data.roomCode,
                    response: data.response,
                })
                .then((res) => {
                    if (res.data.error) throw new Error();
                    toast.info("Resposta registrada.");
                    setReplySent(true);
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Erro ao enviar resposta.");
                });
        }
    }, [sendResponse]);

    const handleAnswer = (index) => {
        clearInterval(timerInterval); // Pausa o cronômetro
        setData("response", index);
        setSendResponse(true);
    };

    return (
        <GameLayout title={`Ajuda Universitária da Sala ${roomCode}`}>
            <Grid
                container
                spacing={3}
                className="min-h-full justify-end gap-x-32"
            >
                <Grid item xs={7} className="content-center">
                    <Typography
                        variant="body1"
                        className="p-1 flex justify-end text-white"
                        sx={{ fontSize: "36px", marginTop: "-44px" }}
                    >
                        {formatTime(timeLeft)}
                    </Typography>

                    <div className="space-y-1">
                        <Paper elevation={3} className="p-4">
                            <Typography
                                variant="h6"
                                className="w-full text-wrap flex justify-center align-middle text-center p-3"
                            >
                                {capitalizeFirstLetter(question)}
                            </Typography>
                        </Paper>
                        <List className="space-y-2">
                            {options.map((option, index) => (
                                <Paper
                                    elevation={3}
                                    key={index}
                                    className={
                                        "hover:bg-indigo-200 transition duration-300 ease-in-out"
                                    }
                                >
                                    <Button
                                        variant="text"
                                        color="inherit"
                                        className="w-full block text-wrap"
                                        onClick={() =>
                                            !sendResponse && handleAnswer(index)
                                        }
                                        style={{ textTransform: "none" }}
                                    >
                                        <ListItem>
                                            <ListItemText
                                                primary={
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            marginTop: "-6px",
                                                            marginBottom:
                                                                "-6px",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                        className="align-middle"
                                                    >
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                fontSize:
                                                                    "24px",
                                                                fontWeight: 500,
                                                                marginRight:
                                                                    "8px",
                                                            }}
                                                            component="span"
                                                        >
                                                            {index + 1} -
                                                        </Typography>
                                                        <div
                                                            style={{
                                                                paddingTop:
                                                                    "2px",
                                                            }}
                                                        >
                                                            {capitalizeFirstLetter(
                                                                option
                                                            )}
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        </ListItem>
                                    </Button>
                                </Paper>
                            ))}
                        </List>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={3}
                    className="content-center"
                    sx={{ marginTop: "-16px" }}
                >
                    <img
                        src={universityHelpImage}
                        alt="universityHelpImage"
                        className="fill-current object-cover px-4"
                    />
                </Grid>
            </Grid>

            <Modal
                open={replySent}
                className="flex justify-center items-center w-full h-full overflow-auto text-center text-wrap"
            >
                <Paper
                    className="xl:m-12 overflow-auto"
                    sx={{
                        padding: "16px",
                        maxWidth: "500px",
                        maxHeight: "70vh",
                    }}
                >
                    <Typography variant="h6">
                        Sua resposta foi registrada!
                    </Typography>

                    <div className="flex justify-center mt-5">
                        <img
                            src={excellence}
                            alt="excellence"
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                    <div className="flex justify-end mt-6">
                        <Link href={route("university-help-code")}>
                            <Button
                                size="small"
                                variant="contained"
                                color="info"
                                endIcon={<East />}
                            >
                                Voltar
                            </Button>
                        </Link>
                    </div>
                </Paper>
            </Modal>
        </GameLayout>
    );
}

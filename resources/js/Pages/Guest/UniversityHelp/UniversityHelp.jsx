import GameLayout from "@/Layouts/GameLayout";
import { toast } from "@/utils/common/Toast";
import { useForm } from "@inertiajs/react";
import {
    Button,
    Typography,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { useState, useEffect } from "react";
import announcer from "@/assets/images/game/announcer2.png";

// Função para converter a string de tempo em segundos
const parseTime = (timeString) => {
    const [minutes, seconds] = timeString.split(":").map(Number);
    return minutes * 60 + seconds;
};

// Função para formatar o tempo restante para "mm:ss"
const formatTime = (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
    }${seconds}`;
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function Playing({ roomCode, timer, question, options }) {
    const { data, setData, post, processing, errors } = useForm({
        correctResponses: [],
        inSeconds: [],
        points: 0,
    });

    const [timeLeft, setTimeLeft] = useState(parseTime(timer.slice(3)));
    const [timerInterval, setTimerInterval] = useState(null);

    useEffect(() => {
        if (timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            setTimerInterval(interval);
            return () => clearInterval(interval);
        } else if (timeLeft === 0) {
            toast.error("Tempo esgotado!");
            // handle isso
        }
    }, [timeLeft]);

    const handleAnswer = (selectedOption) => {
        clearInterval(timerInterval); // Pausa o cronômetro
    };

    return (
        <GameLayout title={`Ajuda Universitária da Sala ${roomCode}`}>
            <Grid container spacing={3} className="min-h-full justify-evenly">
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
                                            handleAnswer(option, index)
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
                        src={announcer}
                        alt="announcer"
                        className="fill-current object-cover px-4"
                    />
                </Grid>
            </Grid>
        </GameLayout>
    );
}

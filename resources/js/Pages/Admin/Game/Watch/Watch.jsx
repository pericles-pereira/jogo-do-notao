import GameLayout from "@/Layouts/GameLayout";
import { toast } from "@/utils/common/Toast";
import { Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { parseTime } from "@/utils/common/time";
import { West } from "@mui/icons-material";
import {
    Button,
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemText,
    Modal,
    Paper,
    Typography,
} from "@mui/material";
import ReactConfetti from "react-confetti";
import finish from "@/assets/images/game/finish.png";
import { capitalizeFirstLetter } from "@/utils/common/strings";
import coloredDragonBalls from "@/assets/images/game/coloredDragonBalls.png";
import dragonBalls from "@/assets/images/game/dragonBalls.png";

export default function Watch({
    roomCode,
    timer,
    questions,
    maximumPoints,
}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(parseTime(timer.slice(3)));
    const [timerInterval, setTimerInterval] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [questionPoints, setQuestionPoints] = useState([]);
    const [endGame, setEndGame] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [progress, setProgress] = useState(100);
    const [inGameRecordsState, setInGameRecordsState] = useState([]);
    const [count, setCount] = useState(0);
    const [countInterval, setCountInterval] = useState(null);
    const [requestGameRecordsInterval, setRequestGameRecordsInterval] =
        useState(null);

    useEffect(() => {
        if (endGame) return;

        const intervalId = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 4000);

        setCountInterval(countInterval);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        axios
            .get(
                route("get-game-records", {
                    roomCode: roomCode,
                })
            )
            .then((res) => {
                if (res.data.error) throw new Error(res.data.message);

                return res.data;
            })
            .then(({ inGameRecords }) => {
                const inGameLength = inGameRecords.length;
                setCurrentQuestionIndex(inGameLength);
                setCurrentQuestion(questions[inGameLength]);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        let interval;
        if (endGame) return;

        const consultAnswer = () => {
            axios
                .get(
                    route("get-game-records", {
                        roomCode: roomCode,
                    })
                )
                .then((res) => {
                    if (res.data.error) throw new Error(res.data.message);

                    return res.data;
                })
                .then(({ inGameRecords }) => {
                    const inGameLength = inGameRecords.length;

                    if (inGameLength === 0) return;

                    const response = inGameRecords.pop().response;

                    if (inGameLength !== inGameRecordsState.length)
                        setInGameRecordsState(inGameRecords);

                    if (currentQuestionIndex + 1 === inGameLength) {
                        clearInterval(timerInterval);

                        if (response === currentQuestion.correctOption) {
                            toast.success("Resposta correta! Avançando...");
                            setCorrectAnswers(inGameLength);
                            toNextQuestion(inGameLength);
                        } else {
                            toast.error(
                                "Resposta incorreta! Finalizando jogo..."
                            );
                            setTimeout(async () => {
                                setEndGame(true);
                            }, 3500);
                            return;
                        }
                    }
                })
                .catch((error) => console.error(error));
        };

        consultAnswer();

        interval = setInterval(consultAnswer, 4000);

        setRequestGameRecordsInterval(interval);

        return () => clearInterval(interval);
    }, [count]);

    useEffect(() => {
        if (!endGame) {
            if (timeLeft > 0) {
                const interval = setInterval(() => {
                    setTimeLeft((prevTime) => prevTime - 1);
                }, 1000);
                setTimerInterval(interval);
                return () => clearInterval(interval);
            }
        }
    }, [timeLeft]);

    useEffect(() => {
        setProgress(() => {
            const maxTime = parseTime(timer.slice(3));
            const newProgress = (timeLeft / maxTime) * 100;
            if (newProgress <= 0) return 0;
            return newProgress;
        });
    }, [timeLeft]);

    useEffect(() => {
        if (endGame) {
            if (correctAnswers === questions.length) {
                setShowConfetti(true);
            }
            clearInterval(countInterval);
            clearInterval(timerInterval); // Pausa o cronômetro
            clearInterval(requestGameRecordsInterval);
        }
    }, [endGame]);

    useEffect(() => {
        if (!endGame) setCurrentQuestion(questions[currentQuestionIndex]);
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (!endGame) {
            if (currentQuestion) {
                if (currentQuestion.correctOption) {
                    setOptions(
                        [
                            currentQuestion.correctOption,
                            currentQuestion.wrongOption1,
                            currentQuestion.wrongOption2,
                            currentQuestion.wrongOption3,
                            currentQuestion.wrongOption4,
                        ].sort(() => Math.random() - 0.5)
                    );
                }
            }
        }
    }, [currentQuestion]);

    useEffect(() => {
        const distributePointsExponential = (numberOfQuestions, limit) => {
            const points = [];

            // Exponenciação base
            const base = limit >= 5 ? limit * 1.2 : limit * 7;

            for (let i = 0; i < numberOfQuestions; i++) {
                if (i === 0) {
                    points.push(limit.toFixed(2));
                    continue;
                }

                // Calcula o peso exponencial
                const point = limit * Math.pow(base, -(i / numberOfQuestions));
                points.push((Math.ceil(point / 0.05) * 0.05).toFixed(2));
            }

            return points;
        };

        setQuestionPoints(
            distributePointsExponential(
                questions.length,
                parseFloat(maximumPoints)
            )
        );
    }, []);

    const toNextQuestion = (index) => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(index);
            setTimeLeft(parseTime(timer.slice(3))); // Reinicia o cronômetro para a próxima pergunta
        } else {
            setEndGame(true);
        }
    };

    return (
        <GameLayout title={`Assistindo a Sala ${roomCode}`}>
            <Grid
                container
                spacing={3}
                className="min-h-full xl:space-x-35 lg:space-x-30 md:space-x-20 space-x-5"
            >
                <Grid
                    item
                    className="bg-black opacity-75 relative"
                    sx={{
                        height: "calc(100vh + 24px)",
                        minWidth: "16vw",
                        marginLeft: "-24px",
                        marginTop: "-24px",
                    }}
                >
                    <div className="h-full flex flex-col justify-around items-center">
                        {questionPoints.map((points, index) => (
                            <Typography
                                key={index}
                                variant="h6"
                                className={`p-3 text-center flex ${
                                    index + 1 <=
                                    questionPoints.length - correctAnswers
                                        ? "text-white"
                                        : "text-yellow-500"
                                }`}
                            >
                                {index + 1 <=
                                questionPoints.length - correctAnswers ? (
                                    <img
                                        src={dragonBalls}
                                        alt="dragonBalls"
                                        style={{
                                            objectFit: "cover",
                                            width: "40px",
                                            height: "34px",
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={coloredDragonBalls}
                                        alt="coloredDragonBalls"
                                        style={{
                                            objectFit: "cover",
                                            width: "40px",
                                            height: "34px",
                                        }}
                                    />
                                )}

                                <div className="ml-3">{points}</div>
                            </Typography>
                        ))}
                    </div>
                    <div
                        className={`absolute inset-y-0 right-0 bg-yellow-500`}
                        style={{
                            width: "5px",
                            top: `${
                                100 -
                                (correctAnswers / questionPoints.length) * 100
                            }%`,
                        }}
                    ></div>
                </Grid>

                <Grid item xs={9} className="content-center pr-10">
                    <div className="space-y-1">
                        <Paper elevation={3} className="p-4">
                            <CircularProgress
                                variant="determinate"
                                value={progress}
                                color={progress < 15 ? "error" : "primary"}
                                className="absolute"
                            />
                            <Typography
                                variant="h6"
                                className="w-full text-wrap flex justify-center align-middle p-3 text-justify"
                            >
                                {capitalizeFirstLetter(
                                    currentQuestion?.statement ?? ""
                                )}
                            </Typography>
                        </Paper>
                        {currentQuestion?.statement?.length < 245 && (
                            <List className="space-y-2">
                                {options.map((option, index) => (
                                    <Paper
                                        elevation={3}
                                        key={index}
                                        className="transition duration-300 ease-in-out hover:bg-indigo-200"
                                    >
                                        <Button
                                            variant="text"
                                            color="inherit"
                                            className="w-full block text-wrap"
                                            onClick={() => {}}
                                            style={{
                                                textTransform: "none",
                                                cursor: "default",
                                            }}
                                        >
                                            <ListItem>
                                                <ListItemText
                                                    primary={
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                marginTop:
                                                                    "-6px",
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
                        )}
                    </div>
                </Grid>
            </Grid>
            <Modal
                open={endGame}
                className="flex justify-center items-center w-full h-full overflow-auto text-center"
            >
                <Paper
                    className="p-6 xl:m-12 overflow-auto"
                    sx={{
                        padding: "24px",
                        minWidth: "500px",
                        maxHeight: "90vh",
                    }}
                >
                    <Typography variant="h4">Jogo Finalizado!!</Typography>

                    <div className="w-full flex justify-center align-middle mt-2">
                        <img
                            src={finish}
                            alt="finish"
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                            }}
                        />
                    </div>

                    <div className="flex justify-around mt-1">
                        <div className="block">
                            <Typography
                                variant="h5"
                                className={`flex justify-between gap-2 pt-3`}
                            >
                                <span>Respostas Corretas: </span>

                                <span className="text-green-700">
                                    {correctAnswers}
                                </span>
                            </Typography>
                            <Typography
                                variant="h5"
                                className={`flex justify-between gap-2 pt-2`}
                            >
                                <span>Pontuação: </span>
                                <div>
                                    <span className="text-green-700">
                                        {questionPoints[
                                            questions.length - correctAnswers
                                        ] ?? "0.00"}
                                    </span>
                                    <span>
                                        /{parseFloat(maximumPoints).toFixed(2)}
                                    </span>
                                </div>
                            </Typography>
                        </div>
                    </div>
                    <div className={`flex justify-start pr-5 mt-3`}>
                        <Link href={route("game.manage")}>
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<West />}
                            >
                                Voltar
                            </Button>
                        </Link>
                    </div>
                    {showConfetti && (
                        <ReactConfetti
                            numberOfPieces={300}
                            style={{
                                width: "calc(100vw - 24px)",
                                height: "100vh",
                            }}
                        />
                    )}
                </Paper>
            </Modal>
        </GameLayout>
    );
}

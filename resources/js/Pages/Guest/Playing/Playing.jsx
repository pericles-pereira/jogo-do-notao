import ApplicationLogo from "@/Components/Logo/ApplicationLogo";
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
    Box,
    Tooltip,
    Modal,
} from "@mui/material";
import { useState, useEffect } from "react";
import announcer from "@/assets/images/game/announcer2.png";
import cards from "@/assets/images/game/cards.png";
import jump from "@/assets/images/game/jump.png";
import finish from "@/assets/images/game/finish.png";
import giveUp from "@/assets/images/game/give-up.png";
import universityHelp from "@/assets/images/game/universityHelp.png";
import audience from "@/assets/images/game/audience.png";
import sad from "@/assets/images/game/sad.png";
import coloredDragonBalls from "@/assets/images/game/coloredDragonBalls.png";
import dragonBalls from "@/assets/images/game/dragonBalls.png";
import { East } from "@mui/icons-material";
import ReactConfetti from "react-confetti";
import axios from "axios";
import { formatTime, parseTime } from "@/utils/common/time";
import { capitalizeFirstLetter } from "@/utils/common/strings";

export default function Playing({
    playerName,
    roomCode,
    timer,
    questions,
    maximumPoints,
}) {
    const { data, setData, post } = useForm({
        roomCode: roomCode,
        correctResponses: [],
        inMinutes: [],
        points: "0.00",
    });

    const [gameStarted, setGameStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(parseTime(timer.slice(3)));
    const [timerInterval, setTimerInterval] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [questionPoints, setQuestionPoints] = useState([]);
    const [showCorrect, setShowCorrect] = useState(false);
    const [showIncorrect, setShowIncorrect] = useState(null);
    const [endGame, setEndGame] = useState(false);
    const [canUseCards, setCanUseCards] = useState(true);
    const [disableCardQuestions, setDisableCardQuestions] = useState([]);
    const [canJump, setCanJump] = useState(true);
    const [canUseAudience, setCanUseAudience] = useState(true);
    const [canUseUniversityHelp, setCanUseUniversityHelp] = useState(true);
    const [waitingUniversityHelp, setWaitingUniversityHelp] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [openQuitConfirmation, setOpenQuitConfirmation] = useState(false);
    const [threeDots, setThreeDots] = useState("");
    const [universityHelpTime, setUniversityHelpTime] = useState(0);

    const initializeGame = () => {
        setGameStarted(true);
        toast.success("Jogo iniciado. Boa sorte!!");
    };

    useEffect(() => {
        if (!endGame) {
            if (gameStarted && timeLeft > 0) {
                const interval = setInterval(() => {
                    setTimeLeft((prevTime) => prevTime - 1);
                }, 1000);
                setTimerInterval(interval);
                return () => clearInterval(interval);
            } else if (gameStarted && timeLeft === 0) {
                toast.error("Tempo esgotado!");
                setTimeout(async () => {
                    setEndGame(true);
                }, 3500);
            }
        }
    }, [gameStarted, timeLeft]);

    useEffect(() => {
        if (waitingUniversityHelp) {
            if (universityHelpTime > 0) {
                const interval = setInterval(() => {
                    setUniversityHelpTime((prevTime) => prevTime - 1);
                }, 1000);
                return () => clearInterval(interval);
            } else if (universityHelpTime === 0) {
                toast.error("Tempo de espera esgotado!");
                finishUniversityHelp();
            }
        }
    }, [universityHelpTime]);

    useEffect(() => {
        if (endGame) {
            if (correctAnswers === questions.length) {
                setShowConfetti(true);
            }
            clearInterval(timerInterval); // Pausa o cronômetro
        }
    }, [endGame]);

    useEffect(() => {
        if (!endGame) setCurrentQuestion(questions[currentQuestionIndex]);
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (!endGame) {
            if (currentQuestion) {
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

    const toNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setDisableCardQuestions([]);
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setTimeLeft(parseTime(timer.slice(3))); // Reinicia o cronômetro para a próxima pergunta
        } else {
            setEndGame(true);
        }
    };

    const handleAnswer = (selectedOption, index) => {
        if (!endGame) {
            clearInterval(timerInterval); // Pausa o cronômetro
            setShowCorrect(true);

            if (selectedOption === currentQuestion.correctOption) {
                setCorrectAnswers((prevAnswers) => prevAnswers + 1);
                setData({
                    roomCode: roomCode,
                    correctResponses: [
                        ...data.correctResponses,
                        currentQuestion.id,
                    ],
                    inMinutes: [
                        ...data.inMinutes,
                        formatTime(parseTime(timer.slice(3)) - timeLeft),
                    ],
                    points: questionPoints[
                        questions.length - 1 - correctAnswers
                    ],
                });

                toast.success("Resposta correta! Avançando...");
            } else {
                setShowIncorrect(index);
                toast.error("Resposta incorreta! Finalizando jogo...");
                setTimeout(async () => {
                    setEndGame(true);
                }, 3500);
                return;
            }

            setTimeout(async () => {
                setShowCorrect(null);
                setShowIncorrect(null);
                // Avança para a próxima pergunta
                toNextQuestion();
            }, 3500);
        }
    };

    const handleCards = () => {
        if (canUseCards) {
            const randomNumber = Math.random();
            let removeQuestions = 0;
            if (randomNumber < 1 / 4) {
                removeQuestions = 0;
            } else if (randomNumber < 2 / 3) {
                removeQuestions = 1;
            } else {
                removeQuestions = 2;
            }

            const indices = [];

            const getRandomIndex = () => {
                const index = Math.floor(Math.random() * 5);
                const option = options[index] ?? null;
                if (
                    !option ||
                    index > 4 ||
                    option === currentQuestion.correctOption ||
                    indices.some((value) => value === index)
                ) {
                    return getRandomIndex();
                }
                return index;
            };

            for (let i = 0; i < removeQuestions; i++) {
                indices.push(getRandomIndex());
            }

            toast.info(
                `Cartas utilizadas! opções removidas: ${removeQuestions}`
            );
            setDisableCardQuestions(indices);
            setCanUseCards(false);
        }
    };

    const handleJump = () => {
        if (canJump) {
            toast.info("Pulo utilizado, avançando para a próxima questão...");
            toNextQuestion();
            setCanJump(false);
        }
    };

    const handleAudience = () => {
        if (canUseAudience) {
            toast.info(
                "Ajuda da plateia utilizada, você pode ouvir a opinião plateia..."
            );
            setCanUseAudience(false);
        }
    };

    const handleUniversityHelp = () => {
        if (canUseUniversityHelp) {
            clearInterval(timerInterval);
            const [min, sec] = formatTime(timeLeft).split(":");

            const data = new Date();

            data.setUTCMinutes(parseInt(min));
            data.setUTCSeconds(parseInt(sec));

            setWaitingUniversityHelp(true);
            setUniversityHelpTime(timeLeft + 60);

            axios
                .post(route("request-university-help"), {
                    roomCode: roomCode,
                    question: currentQuestion.statement,
                    options: options,
                    timer: data.toISOString(),
                })
                .then((res) => {
                    if (res.data.error) throw new Error(res.data.message);

                    if (res.data.success) {
                        toast.info("Ajuda dos universitários utilizada.");
                        console.log("success");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            setCanUseUniversityHelp(false);
        }
    };

    const finishUniversityHelp = () => {
        setWaitingUniversityHelp(false);
        toNextQuestion();
    };

    const handleCancelUniversityHelp = () => {
        setTimeLeft(universityHelpTime);
        setWaitingUniversityHelp(false);
        toast.info(
            "A ajuda universitária foi cancelada. O tempo de espera será ajustado para o tempo restante da questão."
        );
    };

    useEffect(() => {
        let interval;

        const consultAnswer = () => {
            axios
                .get(
                    route("request-university-help.waiting-response", {
                        roomCode: roomCode,
                    })
                )
                .then((res) => {
                    if (res.data.error) throw new Error(res.data.message);
                    if (res.data.waiting) {
                        return;
                    }

                    if (res.data.response !== null) {
                        setWaitingUniversityHelp(false);
                        const indice = res.data.response;
                        if (parseInt(indice) === 99) {
                            toast.error("Sua ajuda não respondeu a tempo! ");
                            setTimeout(async () => {
                                setEndGame(true);
                            }, 3500);
                            return;
                        }
                        const chosenOption = options[indice];
                        handleAnswer(chosenOption, indice);
                    }
                })
                .catch((error) => console.error(error));
        };

        if (waitingUniversityHelp) {
            consultAnswer();

            interval = setInterval(consultAnswer, 3000);

            return () => clearInterval(interval);
        }
    }, [waitingUniversityHelp]);

    useEffect(() => {
        if (waitingUniversityHelp) {
            setTimeout(() => {
                if (threeDots.length < 3) {
                    setThreeDots(`${threeDots}.`);
                    return;
                }

                setThreeDots("");
            }, 400);
        }
    }, [waitingUniversityHelp, threeDots]);

    return (
        <GameLayout title={`Sala ${roomCode}`}>
            {!gameStarted ? (
                <>
                    <div>
                        <Link href="/">
                            <ApplicationLogo className="w-60 fill-current text-gray-500" />
                        </Link>
                    </div>

                    <div
                        className="w-full sm:max-w-md mt-4 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
                        style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)" }}
                    >
                        <header className="text-center">
                            <Typography
                                variant="h5"
                                className="text-gray-900 font-bold"
                            >
                                Olá, {playerName}
                            </Typography>

                            <Typography
                                variant="body2"
                                className="mt-1 text-gray-600"
                            >
                                Clique para iniciar a partida.
                            </Typography>
                        </header>
                        <div className="flex items-center justify-center mt-8">
                            <Button
                                size="large"
                                color="secondary"
                                className="ms-4"
                                type="button"
                                variant="contained"
                                onClick={initializeGame}
                                disabled={gameStarted}
                            >
                                <Typography>Iniciar Partida</Typography>
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <Grid
                    container
                    spacing={3}
                    className="min-h-full justify-evenly"
                >
                    <Grid
                        item
                        className="bg-black opacity-75 relative"
                        sx={{
                            height: "calc(100vh + 24px)",
                            minWidth: "14vw",
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
                                    (correctAnswers / questionPoints.length) *
                                        100
                                }%`,
                            }}
                        ></div>
                    </Grid>

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
                                    {capitalizeFirstLetter(
                                        currentQuestion.statement
                                    )}
                                </Typography>
                            </Paper>
                            <List className="space-y-2">
                                {options.map((option, index) => (
                                    <Paper
                                        elevation={3}
                                        key={index}
                                        sx={
                                            showCorrect &&
                                            option ===
                                                currentQuestion.correctOption
                                                ? {
                                                      backgroundColor:
                                                          "#3ec32df4",
                                                  }
                                                : showIncorrect &&
                                                  index === showIncorrect
                                                ? {
                                                      backgroundColor:
                                                          "#e9301ff9",
                                                  }
                                                : {}
                                        }
                                        className={`transition duration-300 ease-in-out ${
                                            !showCorrect && !showIncorrect
                                                ? "hover:bg-indigo-200"
                                                : ""
                                        }`}
                                    >
                                        <Button
                                            variant="text"
                                            color="inherit"
                                            className="w-full block text-wrap"
                                            disabled={
                                                disableCardQuestions.length >
                                                    0 &&
                                                disableCardQuestions.some(
                                                    (value) => value === index
                                                )
                                            }
                                            onClick={() =>
                                                !showCorrect &&
                                                !showIncorrect &&
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
                        <Box className="p-4 px-6 grid">
                            <Box className="w-full gap-2 xl:flex min-w-40">
                                <Tooltip title="Sortear Carta">
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        disabled={!canUseCards}
                                        className="pr-2"
                                        onClick={handleCards}
                                        sx={{
                                            height: "50px",
                                            width: "50px",
                                            padding: 0,
                                            backgroundColor: "#7435e0eb",
                                            ":hover": {
                                                backgroundColor: "#622bc1eb",
                                            },
                                            ":disabled": {
                                                backgroundColor: "#5424a764",
                                            },
                                        }}
                                    >
                                        <img
                                            src={cards}
                                            alt="cards"
                                            style={{
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Button>
                                </Tooltip>

                                <Tooltip title="Pular Questão">
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        disabled={!canJump}
                                        onClick={handleJump}
                                        sx={{
                                            height: "50px",
                                            width: "50px",
                                            padding: 0,
                                            backgroundColor: "#2c62e0eb",
                                            ":hover": {
                                                backgroundColor: "#2a54b6eb",
                                            },
                                            ":disabled": {
                                                backgroundColor: "#2e61d95a",
                                            },
                                        }}
                                    >
                                        <img
                                            src={jump}
                                            alt="jump"
                                            style={{
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Button>
                                </Tooltip>

                                <Tooltip title="Ajuda dos Universitários">
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        disabled={!canUseUniversityHelp}
                                        onClick={handleUniversityHelp}
                                        sx={{
                                            height: "50px",
                                            width: "50px",
                                            padding: 0,
                                            backgroundColor: "#e1613aeb",
                                            ":hover": {
                                                backgroundColor: "#b44d2eeb",
                                            },
                                            ":disabled": {
                                                backgroundColor: "#df4a1d79",
                                            },
                                        }}
                                    >
                                        <img
                                            src={universityHelp}
                                            alt="universityHelp"
                                            style={{
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Button>
                                </Tooltip>

                                <Tooltip title="Ajuda da Plateia">
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        disabled={!canUseAudience}
                                        onClick={handleAudience}
                                        sx={{
                                            height: "50px",
                                            width: "50px",
                                            padding: 0,
                                            backgroundColor: "#ce2ce0eb",
                                            ":hover": {
                                                backgroundColor: "#a12aaeeb",
                                            },
                                            ":disabled": {
                                                backgroundColor: "#cb1adf50",
                                            },
                                        }}
                                    >
                                        <img
                                            src={audience}
                                            alt="audience"
                                            style={{
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Button>
                                </Tooltip>
                            </Box>
                        </Box>
                        <Box className="flex px-6 justify-center">
                            <Button
                                variant="contained"
                                color="inherit"
                                style={{
                                    height: "50px",
                                    width: "220px",
                                    padding: 0,
                                    backgroundColor: "#ea1414ed",
                                    gap: "12px",
                                }}
                                onClick={() => setOpenQuitConfirmation(true)}
                            >
                                <img
                                    src={giveUp}
                                    alt="giveUp"
                                    style={{
                                        objectFit: "cover",
                                    }}
                                    className="pb-1"
                                />
                                <Typography
                                    variant="button"
                                    color="white"
                                    sx={{ textTransform: "none" }}
                                    className="pt-0.5"
                                >
                                    Sair da Partida
                                </Typography>
                                <img
                                    src={giveUp}
                                    alt="giveUp"
                                    style={{
                                        objectFit: "cover",
                                        transform: "scaleX(-1)",
                                    }}
                                    className="pb-1"
                                />
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            )}
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

                    <div className="flex justify-around mt-5">
                        <img
                            src={finish}
                            alt="finish"
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                            }}
                        />
                        <div className="block">
                            <Typography
                                variant="h5"
                                className="flex justify-between gap-2 pt-3"
                            >
                                <span>Respostas Corretas: </span>
                                <span className="text-green-700">
                                    {correctAnswers}
                                </span>
                            </Typography>
                            <Typography
                                variant="h5"
                                className="flex justify-between gap-2 pt-2"
                            >
                                <span>Pontuação: </span>
                                <div>
                                    <span className="text-green-700">
                                        {questionPoints[
                                            questions.length - correctAnswers
                                        ] ?? "0.0"}
                                    </span>
                                    <span>
                                        /{parseFloat(maximumPoints).toFixed(2)}
                                    </span>
                                </div>
                            </Typography>
                        </div>
                    </div>
                    <div className="flex justify-end mt-3 pr-5">
                        <Button
                            variant="contained"
                            color="success"
                            endIcon={<East />}
                            onClick={() => post(route("playing.store"))}
                        >
                            Registrar Pontuação
                        </Button>
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

            <Modal
                open={openQuitConfirmation}
                onClose={() => setOpenQuitConfirmation(false)}
                className="flex justify-center items-center w-full h-full overflow-auto text-center text-wrap"
            >
                <Paper
                    className="xl:m-12 overflow-auto"
                    sx={{
                        padding: "20px",
                        maxWidth: "500px",
                        maxHeight: "70vh",
                    }}
                >
                    <Typography variant="h6">
                        Tem certeza que deseja sair da partida?
                    </Typography>

                    <div className="flex justify-center mt-4">
                        <img
                            src={sad}
                            alt="sad"
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                    <div className="flex justify-between mt-6">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                setOpenQuitConfirmation(false);
                                setEndGame(true);
                            }}
                        >
                            Sair da Partida
                        </Button>
                        <Button
                            variant="contained"
                            color="inherit"
                            onClick={() => setOpenQuitConfirmation(false)}
                        >
                            Voltar
                        </Button>
                    </div>
                </Paper>
            </Modal>

            <Modal
                open={waitingUniversityHelp}
                className="flex justify-center items-center w-full h-full overflow-auto text-center text-wrap"
            >
                <Paper
                    className="xl:m-12 overflow-auto"
                    sx={{
                        padding: "20px",
                        minWidth: "480px",
                        maxHeight: "70vh",
                    }}
                >
                    <Typography variant="h6">
                        Aguardando resposta da ajuda universitária{threeDots}
                    </Typography>

                    <div className="flex justify-center mt-4">
                        <Typography
                            variant="body1"
                            className="p-1 flex justify-center text-black"
                            sx={{ fontSize: "60px" }}
                        >
                            {formatTime(universityHelpTime)}
                        </Typography>
                    </div>
                    <div className="flex justify-end mt-6">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleCancelUniversityHelp}
                        >
                            Cancelar Ajuda
                        </Button>
                    </div>
                </Paper>
            </Modal>
        </GameLayout>
    );
}

import GameLayout from "@/Layouts/GameLayout";
import { toast } from "@/utils/common/Toast";
import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { formatTime, parseTime } from "@/utils/common/time";
import Modals from "./partials/Modals/Modals";
import { useMediaQuery } from "@mui/material";
import LargeScreen from "./partials/LargeScreen/LargeScreen";
import SmallScreen from "./partials/SmallScreen/SmallScreen";
import InitialScreen from "./partials/InitialScreen/InitialScreen";

export default function Playing({
    playerName,
    roomCode,
    timer,
    questions,
    maximumPoints,
    gameAcronym,
}) {
    const { data, setData } = useForm({
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
    const [disableAllQuestions, setDisableAllQuestions] = useState(false);

    const isMobile = useMediaQuery("(max-width:428px)");

    const initializeGame = () => {
        axios
            .patch(route("set-playing-attribute"), {
                roomCode: roomCode,
            })
            .then((res) => {
                if (res.data.error) throw new Error(res.data.message);
                setGameStarted(true);
                toast.success("Jogo iniciado. Boa sorte!!");
            })
            .catch((e) => {
                console.log(e);
                toast.error("Erro ao inicializar o jogo.");
            });
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

        const questionPoints = distributePointsExponential(
            questions.length,
            parseFloat(maximumPoints)
        );

        setQuestionPoints(questionPoints);
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
            setDisableAllQuestions(true);
            axios
                .post(route("set-question-response"), {
                    roomCode: roomCode,
                    response: selectedOption,
                    questionId: questions[currentQuestionIndex].id,
                    inMinutes: [
                        ...data.inMinutes,
                        formatTime(parseTime(timer.slice(3)) - timeLeft),
                    ],
                    points: questionPoints[
                        questions.length - 1 - correctAnswers
                    ],
                })
                .then((res) => {
                    if (res.data.error) throw new Error(res.data.message);
                    setDisableAllQuestions(false);
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
                                formatTime(
                                    parseTime(timer.slice(3)) - timeLeft
                                ),
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
                })
                .catch((e) => {
                    console.log(e);
                    toast.error("Falha ao registrar resposta.");
                    setTimeout(async () => {
                        setEndGame(true);
                    }, 3500);
                });
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
                <InitialScreen
                    gameStarted={gameStarted}
                    playerName={playerName}
                    initializeGame={initializeGame}
                />
            ) : isMobile ? (
                <SmallScreen
                    canJump={canJump}
                    canUseCards={canUseCards}
                    canUseAudience={canUseAudience}
                    canUseUniversityHelp={canUseUniversityHelp}
                    correctAnswers={correctAnswers}
                    currentQuestion={currentQuestion}
                    disableCardQuestions={disableCardQuestions}
                    handleAnswer={handleAnswer}
                    handleAudience={handleAudience}
                    handleCards={handleCards}
                    handleJump={handleJump}
                    handleUniversityHelp={handleUniversityHelp}
                    options={options}
                    questionPoints={questionPoints}
                    setOpenQuitConfirmation={setOpenQuitConfirmation}
                    showCorrect={showCorrect}
                    showIncorrect={showIncorrect}
                    timeLeft={timeLeft}
                    questions={questions}
                    disableAllQuestions={disableAllQuestions}
                />
            ) : (
                <LargeScreen
                    canJump={canJump}
                    canUseCards={canUseCards}
                    canUseAudience={canUseAudience}
                    canUseUniversityHelp={canUseUniversityHelp}
                    correctAnswers={correctAnswers}
                    currentQuestion={currentQuestion}
                    disableCardQuestions={disableCardQuestions}
                    handleAnswer={handleAnswer}
                    handleAudience={handleAudience}
                    handleCards={handleCards}
                    handleJump={handleJump}
                    handleUniversityHelp={handleUniversityHelp}
                    options={options}
                    questionPoints={questionPoints}
                    setOpenQuitConfirmation={setOpenQuitConfirmation}
                    showCorrect={showCorrect}
                    showIncorrect={showIncorrect}
                    timeLeft={timeLeft}
                    disableAllQuestions={disableAllQuestions}
                />
            )}
            <Modals
                correctAnswers={correctAnswers}
                endGame={endGame}
                handleCancelUniversityHelp={handleCancelUniversityHelp}
                maximumPoints={maximumPoints}
                openQuitConfirmation={openQuitConfirmation}
                questionPoints={questionPoints}
                questions={questions}
                setEndGame={setEndGame}
                setOpenQuitConfirmation={setOpenQuitConfirmation}
                showConfetti={showConfetti}
                universityHelpTime={universityHelpTime}
                waitingUniversityHelp={waitingUniversityHelp}
                threeDots={threeDots}
                isMobile={isMobile}
                gameAcronym={gameAcronym}
            />
        </GameLayout>
    );
}

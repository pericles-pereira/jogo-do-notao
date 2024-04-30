import { Button, Modal, Paper, Typography } from "@mui/material";
import ReactConfetti from "react-confetti";
import { East } from "@mui/icons-material";
import sad from "@/assets/images/game/sad.png";
import finish from "@/assets/images/game/finish.png";
import { formatTime } from "@/utils/common/time";
import { Link } from "@inertiajs/react";

export default function Modals({
    endGame,
    correctAnswers,
    questions,
    questionPoints,
    maximumPoints,
    openQuitConfirmation,
    setOpenQuitConfirmation,
    handleCancelUniversityHelp,
    universityHelpTime,
    waitingUniversityHelp,
    setEndGame,
    showConfetti,
    threeDots,
    isMobile,
    gameAcronym,
}) {
    return (
        <>
            <Modal
                open={endGame}
                className="flex justify-center items-center w-full h-full overflow-auto text-center"
            >
                <Paper
                    className={
                        isMobile
                            ? "p-2 py-3 overflow-auto mx-3"
                            : "p-6 xl:m-12 overflow-auto"
                    }
                    sx={{
                        padding: isMobile ? "" : "18px",
                        minWidth: isMobile ? "auto" : "500px",
                        maxWidth: !isMobile ? "auto" : "428px",
                        maxHeight: "90vh",
                    }}
                >
                    <Typography
                        variant={!isMobile ? "h4" : "h6"}
                        sx={
                            isMobile
                                ? {
                                      fontSize: "24px",
                                  }
                                : {}
                        }
                    >
                        Jogo Finalizado!!
                    </Typography>

                    <div className="w-full flex justify-center align-middle mt-2">
                        <img
                            src={finish}
                            alt="finish"
                            style={
                                isMobile
                                    ? {
                                          width: "90px",
                                          height: "90px",
                                          objectFit: "cover",
                                      }
                                    : {
                                          width: "100px",
                                          height: "100px",
                                          objectFit: "cover",
                                      }
                            }
                        />
                    </div>

                    <div className="flex justify-around mt-1">
                        <div
                            className={
                                isMobile
                                    ? "flex justify-center flex-wrap"
                                    : "block"
                            }
                        >
                            <Typography
                                variant={isMobile ? "h6" : "h5"}
                                className={`flex ${
                                    isMobile
                                        ? "justify-center w-full gap-1 pt-1 text-nowrap"
                                        : "justify-between gap-2 pt-3"
                                }`}
                            >
                                <span>Respostas Corretas: </span>

                                <span className="text-green-700">
                                    {correctAnswers}
                                </span>
                            </Typography>
                            <Typography
                                variant={isMobile ? "h6" : "h5"}
                                className={`flex ${
                                    isMobile
                                        ? "justify-center w-full gap-1 text-nowrap"
                                        : "justify-between gap-2 pt-2"
                                }`}
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
                    <div
                        className={`flex ${
                            isMobile ? "justify-center" : "justify-end pr-5"
                        } mt-3`}
                    >
                        <Link
                            href={route("ranking", {
                                gameAcronym: gameAcronym,
                            })}
                        >
                            <Button
                                variant="contained"
                                color="success"
                                size={isMobile ? "small" : "medium"}
                                endIcon={<East />}
                            >
                                Ranking
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

            <Modal
                open={openQuitConfirmation}
                onClose={() => setOpenQuitConfirmation(false)}
                className="flex justify-center items-center w-full h-full overflow-auto text-center text-wrap"
            >
                <Paper
                    className={`xl:m-12 overflow-auto ${
                        isMobile ? "mx-1.5 p-3" : ""
                    }`}
                    sx={{
                        padding: isMobile ? "" : "20px",
                        maxWidth: "500px",
                        maxHeight: "70vh",
                    }}
                >
                    <Typography variant="h6">
                        Tem certeza que deseja abandonar a partida?
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
                            {isMobile ? "Sair" : "Sair da Partida"}
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
                    className={`xl:m-12 overflow-auto ${
                        isMobile ? "mx-1.5 p-3" : ""
                    }`}
                    sx={{
                        padding: isMobile ? "" : "24px",
                        minWidth: isMobile ? "auto" : "500px",
                        maxWidth: !isMobile ? "auto" : "428px",
                        maxHeight: "70vh",
                    }}
                >
                    <Typography variant="h6" className="text-wrap">
                        Aguardando resposta da ajuda universitária{threeDots}
                    </Typography>

                    <div className="flex justify-center mt-4">
                        <Typography
                            variant="body1"
                            className="p-1 flex justify-center text-black"
                            sx={{ fontSize: isMobile ? "45px" : "60px" }}
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
        </>
    );
}

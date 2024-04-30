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
} from "@mui/material";
import cards from "@/assets/images/game/cards.png";
import jump from "@/assets/images/game/jump.png";
import giveUp from "@/assets/images/game/give-up.png";
import universityHelp from "@/assets/images/game/universityHelp.png";
import audience from "@/assets/images/game/audience.png";
import coloredDragonBalls from "@/assets/images/game/coloredDragonBalls.png";
import { formatTime } from "@/utils/common/time";
import { capitalizeFirstLetter } from "@/utils/common/strings";

export default function SmallScreen({
    timeLeft,
    currentQuestion,
    showCorrect,
    showIncorrect,
    options,
    disableCardQuestions,
    handleAnswer,
    canUseCards,
    canJump,
    canUseAudience,
    canUseUniversityHelp,
    handleCards,
    handleAudience,
    handleJump,
    handleUniversityHelp,
    setOpenQuitConfirmation,
    correctAnswers,
    questionPoints,
    questions,
    disableAllQuestions,
}) {
    return (
        <Grid container className="min-h-full">
            <Grid item xs={12} className="content-center">
                <Box className="flex justify-between">
                    <Box
                        className="pl-3 flex justify-end gap-1 text-white"
                        sx={{ marginTop: "-100px" }}
                    >
                        <img
                            src={coloredDragonBalls}
                            alt="coloredDragonBalls"
                            className="mt-1.5"
                            style={{
                                objectFit: "cover",
                                width: "32px",
                                height: "28px",
                            }}
                        />
                        <Typography variant="body2" sx={{ fontSize: "30px" }}>
                            {questionPoints[
                                questions.length - correctAnswers
                            ] ?? "0.0"}
                        </Typography>
                    </Box>

                    <Typography
                        variant="body2"
                        className="pr-3 flex justify-end text-white"
                        sx={{ fontSize: "30px", marginTop: "-100px" }}
                    >
                        {formatTime(timeLeft)}
                    </Typography>
                </Box>

                <div className="space-y-1 mx-2" style={{ marginTop: "-62px" }}>
                    <List className="space-y-2">
                        {options.map((option, index) => (
                            <Paper
                                elevation={3}
                                key={index}
                                sx={
                                    showCorrect &&
                                    option === currentQuestion.correctOption
                                        ? {
                                              backgroundColor: "#3ec32df4",
                                          }
                                        : showIncorrect &&
                                          index === showIncorrect
                                        ? {
                                              backgroundColor: "#e9301ff9",
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
                                        disableAllQuestions ||
                                        (disableCardQuestions.length > 0 &&
                                            disableCardQuestions.some(
                                                (value) => value === index
                                            ))
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
                                                        marginTop: "-6px",
                                                        marginBottom: "-6px",
                                                        alignItems: "center",
                                                    }}
                                                    className="align-middle"
                                                >
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            fontSize: "20px",
                                                            fontWeight: 500,
                                                            marginRight: "8px",
                                                        }}
                                                        component="span"
                                                        className="text-nowrap align-middle"
                                                    >
                                                        {index + 1} -
                                                    </Typography>
                                                    <div
                                                        style={{
                                                            paddingTop: "2px",
                                                            fontSize: "14px",
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

                <Box className="p-1 flex justify-center align-middle gap-0.5 flex-wrap">
                    <Tooltip title="Sortear Carta">
                        <Button
                            variant="contained"
                            color="inherit"
                            disabled={!canUseCards}
                            className="pr-2"
                            onClick={handleCards}
                            sx={{
                                height: "40px",
                                width: "35px",
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
                                height: "40px",
                                width: "35px",
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
                                height: "40px",
                                width: "35px",
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
                                height: "40px",
                                width: "35px",
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
                <Box className="flex px-6 mt-1 justify-center">
                    <Button
                        variant="contained"
                        color="inherit"
                        style={{
                            height: "42px",
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
    );
}

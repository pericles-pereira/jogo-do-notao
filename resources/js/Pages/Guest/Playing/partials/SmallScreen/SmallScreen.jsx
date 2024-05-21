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
    Badge,
} from "@mui/material";
import cards from "@/assets/images/game/cards.png";
import jump from "@/assets/images/game/jump.png";
import giveUp from "@/assets/images/game/give-up.png";
import universityHelp from "@/assets/images/game/universityHelp.png";
import audience from "@/assets/images/game/audience.png";
import coloredDragonBalls from "@/assets/images/game/coloredDragonBalls.png";
import { formatTime } from "@/utils/common/time";
import { capitalizeFirstLetter } from "@/utils/common/strings";
import { East } from "@mui/icons-material";

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
    universityResponses,
    playerName,
    roomCode,
    toNextQuestion,
    canGoToNextQuestion,
}) {
    return (
        <Grid container className="min-h-full" sx={{ marginTop: "-24px" }}>
            <Grid
                item
                xs={12}
                className="content-center align-middle items-center"
            >
                <Box className="flex w-full justify-start px-3">
                    <Typography
                        variant="body1"
                        className="p-1 text-black whitespace-nowrap overflow-hidden w-full text-ellipsis"
                        sx={{ fontSize: "24px" }}
                    >
                        <span className="font-medium">{roomCode} -</span>{" "}
                        {playerName}
                    </Typography>
                </Box>
                <Box className="flex flex-row justify-between mt-1">
                    <Box className="pl-3 flex flex-row gap-2 text-black">
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
                        className="pr-3 text-black"
                        sx={{ fontSize: "30px" }}
                    >
                        {formatTime(timeLeft)}
                    </Typography>
                </Box>

                <div className="space-y-1 mx-2">
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
                                <Badge
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    badgeContent={
                                        universityResponses.filter(
                                            (item) => item === index
                                        ).length
                                    }
                                    color="success"
                                    className="w-full block text-wrap"
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
                                                                    "20px",
                                                                fontWeight: 500,
                                                                marginRight:
                                                                    "8px",
                                                            }}
                                                            component="span"
                                                            className="text-nowrap align-middle"
                                                        >
                                                            {index + 1} -
                                                        </Typography>
                                                        <div
                                                            style={{
                                                                paddingTop:
                                                                    "2px",
                                                                fontSize:
                                                                    "14px",
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
                                </Badge>
                            </Paper>
                        ))}
                    </List>
                </div>

                <Box className="p-1 flex justify-center align-middle gap-0.5 flex-wrap mt-2.5">
                    <Tooltip title="Sortear Carta">
                        <span>
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
                        </span>
                    </Tooltip>

                    <Tooltip title="Pular Questão">
                        <span>
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
                        </span>
                    </Tooltip>

                    <Tooltip title="Ajuda dos Universitários">
                        <span>
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
                        </span>
                    </Tooltip>

                    <Tooltip title="Ajuda da Plateia">
                        <span>
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
                        </span>
                    </Tooltip>
                </Box>
                <Box className="flex flex-col justify-center gap-3">
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
                    {canGoToNextQuestion && (
                        <Box className="flex px-6 justify-center">
                            <Button
                                variant="contained"
                                color="success"
                                style={{
                                    height: "42px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                                disabled={!canGoToNextQuestion}
                                onClick={() => toNextQuestion()}
                                endIcon={<East />}
                            >
                                <Typography
                                    variant="button"
                                    color="white"
                                    sx={{ textTransform: "none" }}
                                    className="pt-0.5"
                                >
                                    Próxima Questão
                                </Typography>
                            </Button>
                        </Box>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
}

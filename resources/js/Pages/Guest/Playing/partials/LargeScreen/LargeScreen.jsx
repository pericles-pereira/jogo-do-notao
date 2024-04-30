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
import announcer from "@/assets/images/game/announcer2.png";
import cards from "@/assets/images/game/cards.png";
import jump from "@/assets/images/game/jump.png";
import giveUp from "@/assets/images/game/give-up.png";
import universityHelp from "@/assets/images/game/universityHelp.png";
import audience from "@/assets/images/game/audience.png";
import coloredDragonBalls from "@/assets/images/game/coloredDragonBalls.png";
import dragonBalls from "@/assets/images/game/dragonBalls.png";
import { formatTime } from "@/utils/common/time";
import { capitalizeFirstLetter } from "@/utils/common/strings";

export default function LargeScreen({
    questionPoints,
    correctAnswers,
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
    disableAllQuestions,
}) {
    return (
        <Grid container spacing={3} className="min-h-full justify-evenly">
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
                            100 - (correctAnswers / questionPoints.length) * 100
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
                            className="w-full text-wrap flex justify-center align-middle text-justify p-3"
                        >
                            {capitalizeFirstLetter(currentQuestion.statement)}
                        </Typography>
                    </Paper>
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
                                                            fontSize: "24px",
                                                            fontWeight: 500,
                                                            marginRight: "8px",
                                                        }}
                                                        component="span"
                                                    >
                                                        {index + 1} -
                                                    </Typography>
                                                    <div
                                                        style={{
                                                            paddingTop: "2px",
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
    );
}

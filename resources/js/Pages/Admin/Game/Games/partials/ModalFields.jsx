import InputError from "@/Components/Form/InputError";
import { toast } from "@/utils/common/Toast";
import { formatNumbersForMoney } from "@/utils/common/numbers";
import { textFieldFilters } from "@/utils/helpers/textFieldFilters";
import { Visibility, West } from "@mui/icons-material";
import {
    Box,
    Button,
    Chip,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    OutlinedInput,
    Paper,
    Select,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(theme) {
    return {
        fontWeight: theme.typography.fontWeightRegular,
    };
}

export default function ModalFields({
    data,
    setData,
    errors,
    questions,
    disciplines,
    games,
    inEdit,
}) {
    const theme = useTheme();
    const [viewGameData, setViewGameData] = useState({});
    const [openViewGame, setOpenViewGame] = useState(false);

    const handleOpenViewGame = (data) => {
        setViewGameData(data);
        console.log(data);
        setOpenViewGame(true);
    };

    const handleCloseViewGame = () => {
        setOpenViewGame(false);
        setViewGameData({});
    };

    const { text } = textFieldFilters(setData);

    const processNumberInput = (key, value) => {
        const formattedValue = formatNumbersForMoney(value);
        if (!formattedValue) {
            setData(key, "");
            if (value.length !== 0) {
                toast.warn(
                    "Informe apenas números. Números negativos não são válidos."
                );
            }
            return;
        }
        setData(key, formattedValue);
    };

    return (
        <>
            <div className="w-2/12 p-2 pl-0 pb-1">
                <TextField
                    id="acronym"
                    name="acronym"
                    value={data.acronym}
                    fullWidth
                    onChange={text}
                    error={!!errors.acronym}
                    required
                    variant="outlined"
                    label="Sigla"
                />
                <InputError
                    message={errors.acronym}
                    className="flex justify-start"
                />
            </div>
            <div className="w-6/12 p-2 pl-0 pb-1">
                <TextField
                    id="name"
                    name="name"
                    value={data.name}
                    fullWidth
                    onChange={text}
                    error={!!errors.name}
                    required
                    variant="outlined"
                    label="Nome do Jogo"
                />
                <InputError
                    message={errors.name}
                    className="flex justify-start"
                />
            </div>
            <div className="w-2/12 p-2 pl-0 pb-1">
                <TextField
                    id="maximumPoints"
                    name="maximumPoints"
                    value={data.maximumPoints}
                    fullWidth
                    onChange={(e) =>
                        processNumberInput("maximumPoints", e.target.value)
                    }
                    error={!!errors.maximumPoints}
                    required
                    variant="outlined"
                    label="Pontuação Máxima"
                />
                <InputError
                    message={errors.maximumPoints}
                    className="flex justify-start"
                />
            </div>

            <div className="w-2/12 p-2 pl-0 pb-1">
                <TimePicker
                    views={["minutes", "seconds"]}
                    id="timer"
                    name="timer"
                    value={data.timer}
                    fullWidth
                    onChange={(time) => setData("timer", time)}
                    error={!!errors.timer}
                    required
                    variant="outlined"
                    label="Tempo Por Questão"
                    disableOpenPicker
                />
                <InputError
                    message={errors.timer}
                    className="flex justify-start"
                />
            </div>

            {(data.copyGame?.length === 0 || inEdit) && (
                <div
                    className={`w-full ${
                        inEdit ? "" : "md:w-9/12"
                    } p-2 pl-0 pb-1`}
                >
                    <FormControl
                        fullWidth
                        variant="outlined"
                        required
                        error={!!errors.questions}
                        style={{ minWidth: "200px" }}
                    >
                        <InputLabel id="questionsLabel">Questões</InputLabel>
                        <Select
                            labelId="questionsLabel"
                            id="questions"
                            name="questions"
                            value={data.questions}
                            multiple
                            onChange={(e) =>
                                setData(
                                    "questions",
                                    typeof e.target.value === "string"
                                        ? e.target.value.split(",")
                                        : e.target.value
                                )
                            }
                            error={!!errors.questions}
                            style={{ width: "100%" }}
                            input={<OutlinedInput label="Questões" />}
                            renderValue={(selected) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 0.5,
                                    }}
                                >
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={(questions.filter(
                                                (question) =>
                                                    question?.id === value
                                            )[0]?.difficulty === "1"
                                                ? "Muito Fácil"
                                                : questions.filter(
                                                      (question) =>
                                                          question?.id === value
                                                  )[0]?.difficulty === "2"
                                                ? "Fácil"
                                                : questions.filter(
                                                      (question) =>
                                                          question?.id === value
                                                  )[0]?.difficulty === "3"
                                                ? "Intermediário"
                                                : questions.filter(
                                                      (question) =>
                                                          question?.id === value
                                                  )[0]?.difficulty === "4"
                                                ? "Difícil"
                                                : questions.filter(
                                                      (question) =>
                                                          question?.id === value
                                                  )[0]?.difficulty === "5"
                                                ? "Muito Difícil"
                                                : questions.filter(
                                                      (question) =>
                                                          question?.id === value
                                                  )[0]?.difficulty === "6"
                                                ? "Impossível"
                                                : "???"
                                            ).concat(
                                                " - ",
                                                questions.filter(
                                                    (question) =>
                                                        question?.id === value
                                                )[0]?.title
                                            )}
                                        />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {questions.map((question) => (
                                <MenuItem
                                    key={question.id}
                                    value={question.id}
                                    style={getStyles(theme)}
                                >
                                    {question.difficulty === "1"
                                        ? "Muito Fácil"
                                        : question.difficulty === "2"
                                        ? "Fácil"
                                        : question.difficulty === "3"
                                        ? "Intermediário"
                                        : question.difficulty === "4"
                                        ? "Difícil"
                                        : question.difficulty === "5"
                                        ? "Muito Difícil"
                                        : question.difficulty === "6"
                                        ? "Impossível"
                                        : "???"}{" "}
                                    - {question.title}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputError
                            message={errors.questions}
                            className="flex justify-start"
                        />
                    </FormControl>
                </div>
            )}

            {!inEdit && (
                <div className="w-full md:w-3/12 flex flex-row p-2 pl-0 pb-1">
                    <FormControl
                        fullWidth
                        variant="outlined"
                        error={!!errors.copyGame}
                        style={{ minWidth: "200px" }}
                    >
                        <InputLabel id="copyGameLabel">
                            Copiar Questões do Jogo
                        </InputLabel>
                        <Select
                            labelId="copyGameLabel"
                            id="copyGame"
                            name="copyGame"
                            value={data.copyGame}
                            onChange={(e) => {
                                setData("copyGame", e.target.value);
                                if (e.target.value?.length > 0) {
                                    setData("questions", []);
                                }
                            }}
                            error={!!errors.copyGame}
                            style={{ width: "100%" }}
                            input={
                                <OutlinedInput label="Copiar Questões do Jogo" />
                            }
                        >
                            <MenuItem value="">
                                <em>Selecione</em>
                            </MenuItem>
                            {games.map((game) => (
                                <MenuItem
                                    key={game.id}
                                    value={game.id}
                                    style={getStyles(theme)}
                                >
                                    {game?.acronym} - {game.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputError
                            message={errors.copyGame}
                            className="flex justify-start"
                        />
                    </FormControl>
                    {data?.copyGame?.length !== 0 && (
                        <Tooltip
                            title="Ver Questões do Jogo Selecionado"
                            onClick={() =>
                                handleOpenViewGame(
                                    games
                                        .filter(
                                            (game) => game.id === data.copyGame
                                        )
                                        .shift()
                                )
                            }
                        >
                            <IconButton
                                className="mx-2 my-auto"
                                disabled={data?.copyGame?.length === 0}
                            >
                                <Visibility color="primary" />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
            )}

            <div className="md:w-6/12 w-full p-2 pl-0 pb-1">
                <FormControl
                    fullWidth
                    variant="outlined"
                    required
                    error={!!errors.disciplineId}
                    style={{
                        minWidth: "200px",
                    }}
                >
                    <InputLabel id="disciplineIdLabel">Disciplina</InputLabel>
                    <Select
                        labelId="disciplineIdLabel"
                        id="disciplineId"
                        name="disciplineId"
                        value={data.disciplineId}
                        onChange={(e) =>
                            setData("disciplineId", e.target.value)
                        }
                        label="Disciplina"
                        error={!!errors.disciplineId}
                        style={{
                            width: "100%",
                        }}
                    >
                        <MenuItem value="">
                            <em>Selecione</em>
                        </MenuItem>

                        {disciplines.map((discipline) => (
                            <MenuItem
                                value={discipline?.id}
                                key={discipline?.id}
                            >
                                {discipline?.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <InputError
                        message={errors.disciplineId}
                        className="flex justify-start"
                    />
                </FormControl>
            </div>

            <Modal
                open={openViewGame}
                onClose={handleCloseViewGame}
                disableAutoFocus
                className="pt-14 overflow-y-auto xl:max-w-4xl mx-auto"
            >
                <Paper
                    elevation={3}
                    className="w-auto flex flex-col justify-center items-center p-4 mx-auto"
                >
                    <Typography variant="h5">
                        {viewGameData?.acronym} - {viewGameData?.name}
                    </Typography>
                    <Typography variant="h6" className="pt-4">
                        {viewGameData?.statement}
                    </Typography>
                    <Box className="flex flex-col justify-start w-full gap-2 mt-2">
                        {questions
                            .filter((question) =>
                                viewGameData?.questions?.includes(question.id)
                            )
                            .map((question, index) => (
                                <Typography variant="body1" key={index}>
                                    <span className="font-bold">
                                        {index + 1}-
                                    </span>{" "}
                                    {question?.title}{" "}
                                </Typography>
                            ))}
                    </Box>

                    <Box className="flex justify-start w-full mt-5">
                        <Button
                            variant="contained"
                            onClick={handleCloseViewGame}
                            startIcon={<West />}
                        >
                            <Typography
                                variant="body1"
                                sx={{ textTransform: "none" }}
                            >
                                Voltar
                            </Typography>
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </>
    );
}

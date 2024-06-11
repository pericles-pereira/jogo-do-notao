import InputError from "@/Components/Form/InputError";
import { toast } from "@/utils/common/Toast";
import { formatNumbersForMoney } from "@/utils/common/numbers";
import { textFieldFilters } from "@/utils/helpers/textFieldFilters";
import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    useTheme,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

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
}) {
    const theme = useTheme();
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
            <div className="w-full p-2 pl-0 pb-1">
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
                                            (question) => question?.id === value
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
                                            )[0]?.statement
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
                                - {question.statement}
                            </MenuItem>
                        ))}
                    </Select>
                    <InputError
                        message={errors.questions}
                        className="flex justify-start"
                    />
                </FormControl>
            </div>
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
        </>
    );
}

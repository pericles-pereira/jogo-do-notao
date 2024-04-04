import InputError from "@/Components/Form/InputError";
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

export default function ModalFields({ data, setData, errors, questions }) {
    const theme = useTheme();
    const { text } = textFieldFilters(setData);
    "".padStart;
    return (
        <>
            <div className="w-full p-2 pl-0 pb-1">
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
        </>
    );
}

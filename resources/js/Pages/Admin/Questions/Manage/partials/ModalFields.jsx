import InputError from "@/Components/Form/InputError";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextareaAutosize,
} from "@mui/material";

export default function ModalFields({ data, setData, errors, disciplines }) {
    return (
        <>
            <div className="w-full md:w-6/12 p-2 pl-0 pb-1">
                <FormControl
                    fullWidth
                    variant="outlined"
                    required
                    error={!!errors.disciplineId}
                    style={{ minWidth: "200px" }}
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
                        style={{ width: "100%" }}
                    >
                        <MenuItem value="">
                            <em>Selecione</em>
                        </MenuItem>

                        {disciplines.map((disciplineId) => (
                            <MenuItem
                                value={disciplineId.id}
                                key={disciplineId.id}
                            >
                                {disciplineId?.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <InputError
                        message={errors.disciplineId}
                        className="flex justify-start"
                    />
                </FormControl>
            </div>

            <div className="w-full md:w-6/12 p-2 pl-0 pb-1">
                <FormControl
                    fullWidth
                    variant="outlined"
                    required
                    error={!!errors.difficulty}
                    style={{ minWidth: "200px" }}
                >
                    <InputLabel id="difficultyLabel">Dificuldade</InputLabel>
                    <Select
                        labelId="difficultyLabel"
                        id="difficulty"
                        name="difficulty"
                        value={data.difficulty}
                        onChange={(e) => setData("difficulty", e.target.value)}
                        label="Dificuldade"
                        error={!!errors.difficulty}
                        style={{ width: "100%" }}
                    >
                        <MenuItem value="">
                            <em>Selecione</em>
                        </MenuItem>

                        <MenuItem value={1}>Muito Fácil</MenuItem>
                        <MenuItem value={2}>Fácil</MenuItem>
                        <MenuItem value={3}>Intermediário</MenuItem>
                        <MenuItem value={4}>Difícil</MenuItem>
                        <MenuItem value={5}>Muito Difícil</MenuItem>
                        <MenuItem value={6}>Impossível</MenuItem>
                    </Select>
                    <InputError
                        message={errors.difficulty}
                        className="flex justify-start"
                    />
                </FormControl>
            </div>

            <div className="w-full p-2 pl-0 pb-1">
                <InputLabel
                    htmlFor="title"
                    style={{ fontSize: "1.1rem", color: "#333" }}
                >
                    Título da Questão
                </InputLabel>
                <TextareaAutosize
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    required
                    minRows={1}
                    className="w-full rounded"
                    style={{ fontSize: "1rem" }}
                />
                <InputError
                    message={errors.title}
                    className="flex justify-start"
                />
            </div>

            <div className="w-full p-2 pl-0 pb-1">
                <InputLabel
                    htmlFor="theme"
                    style={{ fontSize: "1.1rem", color: "#333" }}
                >
                    Tema da Questão
                </InputLabel>
                <TextareaAutosize
                    id="theme"
                    name="theme"
                    value={data.theme}
                    onChange={(e) => setData("theme", e.target.value)}
                    required
                    minRows={1}
                    className="w-full rounded"
                    style={{ fontSize: "1rem" }}
                />
                <InputError
                    message={errors.theme}
                    className="flex justify-start"
                />
            </div>

            <div className="w-full p-2 pl-0 pb-1">
                <InputLabel
                    htmlFor="statement"
                    style={{ fontSize: "1.1rem", color: "#333" }}
                >
                    Questão
                </InputLabel>
                <TextareaAutosize
                    id="statement"
                    name="statement"
                    value={data.statement}
                    onChange={(e) => setData("statement", e.target.value)}
                    required
                    minRows={3}
                    className="w-full rounded"
                    style={{ fontSize: "1rem" }}
                />
                <InputError
                    message={errors.statement}
                    className="flex justify-start"
                />
            </div>

            <div className="w-full p-2 pl-0 pb-1">
                <InputLabel
                    htmlFor="correctOption"
                    style={{ fontSize: "1.1rem", color: "#333" }}
                >
                    Opção Correta
                </InputLabel>
                <TextareaAutosize
                    id="correctOption"
                    name="correctOption"
                    value={data.correctOption}
                    onChange={(e) => setData("correctOption", e.target.value)}
                    required
                    minRows={1}
                    className="w-full rounded"
                    style={{ fontSize: "1rem" }}
                />
                <InputError
                    message={errors.correctOption}
                    className="flex justify-start"
                />
            </div>

            <div className="w-full p-2 pl-0 pb-1">
                <InputLabel
                    htmlFor="wrongOption1"
                    style={{ fontSize: "1.1rem", color: "#333" }}
                >
                    Opção Incorreta 1
                </InputLabel>
                <TextareaAutosize
                    id="wrongOption1"
                    name="wrongOption1"
                    value={data.wrongOption1}
                    onChange={(e) => setData("wrongOption1", e.target.value)}
                    required
                    minRows={1}
                    className="w-full rounded"
                    style={{ fontSize: "1rem" }}
                />
                <InputError
                    message={errors.wrongOption1}
                    className="flex justify-start"
                />
            </div>

            <div className="w-full p-2 pl-0 pb-1">
                <InputLabel
                    htmlFor="wrongOption2"
                    style={{ fontSize: "1.1rem", color: "#333" }}
                >
                    Opção Incorreta 2
                </InputLabel>
                <TextareaAutosize
                    id="wrongOption2"
                    name="wrongOption2"
                    value={data.wrongOption2}
                    onChange={(e) => setData("wrongOption2", e.target.value)}
                    required
                    minRows={1}
                    className="w-full rounded"
                    style={{ fontSize: "1rem" }}
                />
                <InputError
                    message={errors.wrongOption2}
                    className="flex justify-start"
                />
            </div>

            <div className="w-full p-2 pl-0 pb-1">
                <InputLabel
                    htmlFor="wrongOption3"
                    style={{ fontSize: "1.1rem", color: "#333" }}
                >
                    Opção Incorreta 3
                </InputLabel>
                <TextareaAutosize
                    id="wrongOption3"
                    name="wrongOption3"
                    value={data.wrongOption3}
                    onChange={(e) => setData("wrongOption3", e.target.value)}
                    required
                    minRows={1}
                    className="w-full rounded"
                    style={{ fontSize: "1rem" }}
                />
                <InputError
                    message={errors.wrongOption3}
                    className="flex justify-start"
                />
            </div>

            <div className="w-full p-2 pl-0 pb-1">
                <InputLabel
                    htmlFor="wrongOption4"
                    style={{ fontSize: "1.1rem", color: "#333" }}
                >
                    Opção Incorreta 4
                </InputLabel>
                <TextareaAutosize
                    id="wrongOption4"
                    name="wrongOption4"
                    value={data.wrongOption4}
                    onChange={(e) => setData("wrongOption4", e.target.value)}
                    required
                    minRows={1}
                    className="w-full rounded"
                    style={{ fontSize: "1rem" }}
                />
                <InputError
                    message={errors.wrongOption4}
                    className="flex justify-start"
                />
            </div>
        </>
    );
}

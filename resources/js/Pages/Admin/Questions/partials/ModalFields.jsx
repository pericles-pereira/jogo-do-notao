import InputError from "@/Components/Form/InputError";
import { textFieldFilters } from "@/utils/helpers/textFieldFilters";
import { TextField } from "@mui/material";

export default function ModalFields({ data, setData, errors }) {
    const { text, numbers } = textFieldFilters(setData);
    
    return (
        <>
            <div className="w-full md:w-2/12 p-2 pl-0 pb-1">
                <TextField
                    id="code"
                    name="code"
                    value={data.code}
                    fullWidth
                    onChange={text}
                    error={!!errors.code}
                    required
                    variant="outlined"
                    label="Código"
                />
                <InputError
                    message={errors.code}
                    className="flex justify-start"
                />
            </div>

            <div className="w-full md:w-6/12 p-2 pl-0 pb-1">
                <TextField
                    id="name"
                    name="name"
                    value={data.name}
                    fullWidth
                    onChange={text}
                    error={!!errors.name}
                    required
                    variant="outlined"
                    label="Descrição"
                />
                <InputError
                    message={errors.name}
                    className="flex justify-start"
                />
            </div>

            <div className="w-full md:w-2/12 p-2 pl-0 pb-1">
                <TextField
                    id="installments"
                    name="installments"
                    value={data.installments}
                    fullWidth
                    onChange={numbers}
                    error={!!errors.installments}
                    required
                    variant="outlined"
                    label="Número de Parcelas"
                />
                <InputError
                    message={errors.installments}
                    className="flex justify-start"
                />
            </div>

            <div className="w-full md:w-2/12 p-2 pl-0 pb-1">
                <TextField
                    id="term"
                    name="term"
                    value={data.term}
                    fullWidth
                    onChange={numbers}
                    error={!!errors.term}
                    required
                    variant="outlined"
                    label="Prazo de Cobrança"
                />
                <InputError
                    message={errors.term}
                    className="flex justify-start"
                />
            </div>
        </>
    );
}

import InputError from "@/Components/Form/InputError";
import { textFieldFilters } from "@/utils/helpers/textFieldFilters";
import { TextField } from "@mui/material";

export default function ModalFields({ data, setData, errors }) {
    const { text } = textFieldFilters(setData);

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
                    label="Categoria"
                />
                <InputError
                    message={errors.name}
                    className="flex justify-start"
                />
            </div>
        </>
    );
}

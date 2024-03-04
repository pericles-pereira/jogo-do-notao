import { Typography } from "@mui/material";

export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-sm text-gray-700 ` + className}>
            <Typography>{value ? value : children}</Typography>
        </label>
    );
}

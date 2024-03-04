import { Typography } from "@mui/material";

export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <Typography variant="p" component="p" {...props} className={'text-sm text-red-600 ' + className}>
            {message}
        </Typography>
    ) : null;
}

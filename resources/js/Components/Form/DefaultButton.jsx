import { Button } from "@mui/material";

export default function DefaultButton({ children, type = "submit", ...rest }) {
    return (
        <Button type={type} variant="contained" size="large" {...rest}>
            {children}
        </Button>
    );
}

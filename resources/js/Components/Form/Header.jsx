import { Typography } from "@mui/material";

export default function Header({ title, subtitle, ...rest }) {
    return (
        <header {...rest}>
            {title && (<Typography variant="h6" className="text-gray-900">
                {title}
            </Typography>)}
            {subtitle &&(<Typography variant="body2" className="mt-1 text-gray-600">
                {subtitle}
            </Typography>)}
        </header>
    );
}

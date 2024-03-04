import { Box, Typography } from "@mui/material";

export default function Copyright(props) {
    return (
        <Box
            sx={{
                margin: "0 auto",
                width: "100%",
                padding: "5px",
                backgroundColor: "inherit",
                textAlign: "center",
                "@media (max-width:600px)": {
                    position: "static",
                    transform: "none",
                },
            }}
        >
            <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                {...props}
                sx={{ textAlign: "center"}}
            >
                <a
                    color="inherit"
                    target="_blank"
                    href="https://www.linkedin.com/in/pericles-pereira/"
                    rel="noopener noreferrer"
                >
                    {"Copyright © "}
                    Péricles Pereira - {new Date().getFullYear()}
                    {"."}
                </a>
            </Typography>
        </Box>
    );
}

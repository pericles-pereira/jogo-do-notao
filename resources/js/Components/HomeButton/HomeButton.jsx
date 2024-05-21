import { Link } from "@inertiajs/react";
import { West } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function HomeButton({ color = null, hoverColor = null }) {
    return (
        <Link href={route("room-code")}>
            <Button
                variant="contained"
                sx={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    backgroundColor: color ? color : "black",
                    ":hover": {
                        backgroundColor: hoverColor
                            ? hoverColor
                            : "rgba(0, 0, 0, 0.88)",
                    },
                }}
                className=""
                startIcon={<West />}
            >
                Home
            </Button>
        </Link>
    );
}

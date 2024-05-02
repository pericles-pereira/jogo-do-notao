import { useDrawer } from "@/Context/DrawerContext";
import { ListSubheader, Typography } from "@mui/material";
import { commonStyles as styles } from "./Shared/commonStyles";

// Gera um header para a sidebar
export default function MenuHeader({ item }) {
    const { open } = useDrawer();

    const menuHeaderStyles = {
        textAlign: "center",
        padding: "5px 0 4px 0",
        marginLeft: "-80px",
        backgroundColor: "inherit",
        color: styles.fontColor,
        position: "relative",
    };

    return (
        open && (
            <ListSubheader component="div" inset sx={menuHeaderStyles}>
                <Typography variant="subtitle2" component="span" noWrap>
                    {item.header}
                </Typography>
            </ListSubheader>
        )
    );
}

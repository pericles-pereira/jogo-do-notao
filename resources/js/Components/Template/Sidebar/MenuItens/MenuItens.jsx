import * as React from "react";
import { Box, List } from "@mui/material";
import MenuItem from "./Itens/MenuItem";

export default function MenuItens({ menu }) {
    const [menuOpenStates, setMenuOpenStates] = React.useState({});

    const handleToggle = (itemId, open) => {
        setMenuOpenStates((prevStates) => ({ ...prevStates, [itemId]: open }));
    };

    return (
        <Box>
            <List component="nav" sx={{ padding: "0 0 0 0" }}>
                {menu.map((item) => (
                    <React.Fragment key={item.id}>
                        {MenuItem(item, menuOpenStates, handleToggle)}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}

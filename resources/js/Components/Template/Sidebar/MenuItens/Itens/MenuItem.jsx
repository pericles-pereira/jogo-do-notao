import React from "react";
import { usePage } from "@inertiajs/react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, ListItemButton, Typography } from "@mui/material";
import SubmenuItem from "./SubmenuItem";
import MenuHeader from "./MenuHeader";
import { commonStyles as styles } from "./Shared/commonStyles";
import { utilsFunctions as utils } from "./Shared/utilsFunctions";

// Gera todos os itens principais do menu (componente pai dos submenus - estado de nível mais elevado)
export default function MenuItem(item, openStates, handleToggle) {
    const page = usePage();
    const open = openStates[item.id] || false;

    React.useEffect(() => {
        const hasChildInPage = utils.checkDescendantsForPage(item, page.props?.ziggy?.location);

        if (hasChildInPage) {
            handleToggle(item.id, true);
        }
    }, []);

    const stylesListItem = {
        backgroundColor: open ? styles.openItemOpacity : "inherit",
        color: styles.fontColor,
        ...(item.url && page.props?.ziggy?.location === item.url && { ...styles.selectedItemStyles }),
        ...styles.hoverOpacity,
    };

    const listOnClick = () =>
        item.submenu && open ? handleToggle(item.id, false) : handleToggle(item.id, true);

    if (item.header) return <MenuHeader item={item} />;

    return (
        <React.Fragment key={item.id}>
            {utils.link(
                <ListItemButton onClick={listOnClick} sx={stylesListItem}>
                    {utils.getIcon(item)}

                    <Typography
                        variant="h6"
                        sx={{ fontSize: "14px" }}
                        component="span"
                        noWrap
                    >
                        {" "}
                        {item.text}{" "}
                    </Typography>

                    {item.submenu &&
                        (open ? (<ExpandLess sx={styles.expandStyle} />)
                            : (<ExpandMore sx={styles.expandStyle} />)
                    )}
                </ListItemButton>,
                item.url
            )}
            {item.submenu && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {item.submenu.map((subItem) =>
                        SubmenuItem(item.id, subItem, openStates, handleToggle)
                    )}
                </Collapse>
            )}
        </React.Fragment>
    );
}

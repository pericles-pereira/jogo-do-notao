import { usePage } from "@inertiajs/react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, ListItemButton, Typography } from "@mui/material";
import React from "react";
import { commonStyles as styles } from "./Shared/commonStyles";
import { utilsFunctions as utils } from "./Shared/utilsFunctions";

// Gera todos os itens de submenus, de forma recursiva
export default function SubmenuItem(
    fatherId,
    subItem,
    openStates,
    handleToggle
) {
    const page = usePage();
    const open = openStates[subItem.id] || false;

    React.useEffect(() => {
        const hasChildInPage = utils.checkDescendantsForPage(
            subItem,
            page.props?.ziggy?.location
        );
        if (hasChildInPage) {
            handleToggle(subItem.id, true);
            handleToggle(fatherId, true);
        }
    }, []);

    const listOnClick = () =>
        subItem.submenu && open
            ? handleToggle(subItem.id, false)
            : handleToggle(subItem.id, true);

    const stylesListSubItem = {
        color: styles.fontColor,
        backgroundColor: subItem.submenu
            ? open
                ? styles.openItemOpacity
                : "inherit"
            : styles.subItemOpenOpacity,
        ...(subItem.url &&
            page.props?.ziggy?.location === subItem.url && {
                ...styles.selectedItemStyles,
            }),
        ...styles.hoverOpacity,
    };

    return (
        <React.Fragment key={subItem.id}>
            {utils.link(
                <ListItemButton onClick={listOnClick} sx={stylesListSubItem}>
                    {utils.getIcon(subItem)}

                    <Typography
                        variant="h6"
                        sx={{ fontSize: "14px" }}
                        component="span"
                        noWrap
                    >
                        {" "}
                        {subItem.text}{" "}
                    </Typography>

                    {subItem.submenu &&
                        subItem.submenu.length > 0 &&
                        (open ? (
                            <ExpandLess sx={styles.expandStyle} />
                        ) : (
                            <ExpandMore sx={styles.expandStyle} />
                        ))}
                </ListItemButton>,
                subItem.url
            )}
            {subItem.submenu && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {subItem.submenu.map((nestedSubItem) =>
                        SubmenuItem(
                            subItem.id,
                            nestedSubItem,
                            openStates,
                            handleToggle
                        )
                    )}
                </Collapse>
            )}
        </React.Fragment>
    );
}

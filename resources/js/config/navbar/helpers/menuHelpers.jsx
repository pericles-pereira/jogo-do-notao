const menuHelpers = {
    IconWrapper: (Icon) => {
        return (styles) => {
            return <Icon sx={{ ...styles }} />;
        };
    },

    menuFormatter: (menu, permissions, idCounter = { value: 1 }) => {
        if(permissions.length === 0) return [];
        
        return menu
            .filter((item) => {
                if (item.can) {
                    const requiredPermissions = Array.isArray(item.can) ? item.can : [item.can];
                    return requiredPermissions.some((permission) => permissions[permission]);
                }
                return true;
            })
            .map((item) => {
                const currentId = idCounter.value++;

                if (item.submenu) {
                    const submenuItems = menuHelpers.menuFormatter(
                        item.submenu,
                        permissions,
                        idCounter
                    );
                    return {
                        ...item,
                        id: currentId,
                        submenu: submenuItems,
                    };
                }

                return {
                    ...item,
                    id: currentId,
                };
            });
    },
};

export default menuHelpers;

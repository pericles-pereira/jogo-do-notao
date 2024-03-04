import React, { createContext, useContext, useState } from "react";

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
    const [openByClick, setOpenByClick] = useState(false);
    const [open, setOpen] = useState(false);

    const defineOpenState = (state) => {
        setOpen(state);
        setOpenByClick(false);
    };

    const defineOpenByClickState = (state) => {
        setOpenByClick(state);
        setOpen(state);
    }

    const contextValue = {
        open,
        openByClick,
        defineOpenState,
        defineOpenByClickState
    };

    return (
        <DrawerContext.Provider value={contextValue}>
            {children}
        </DrawerContext.Provider>
    );
};

export const useDrawer = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error("useDrawer must be used within a DrawerProvider");
    }
    return context;
};

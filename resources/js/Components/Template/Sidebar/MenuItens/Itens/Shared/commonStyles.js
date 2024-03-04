export const commonStyles = {
    // Cor da fonte dos itens
    fontColor: "white",

    // Estilos para todos os ícones de expand
    expandStyle: { fontSize: "32px", marginLeft: "auto" },

    // Estilos para os itens selecionados
    selectedItemStyles: {
        borderLeft: "6px solid",
        paddingLeft: "10px",
        borderLeftColor: "white",
        backgroundColor: "rgba(255, 255, 255, 0.12)",
    },

    // Define a opacidade do hover dos itens
    hoverOpacity: {
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.25)",
        },
    },

    // Define a opacidade dos itens abertos
    openItemOpacity: "rgba(255, 255, 255, 0.2)",

    // Define a opacidade dos subitens abertos
    subItemOpenOpacity: "rgba(255, 255, 255, 0.07)",
};

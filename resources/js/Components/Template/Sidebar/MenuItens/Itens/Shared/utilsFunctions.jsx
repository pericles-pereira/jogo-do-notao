import { Link } from "@inertiajs/react";

export const utilsFunctions = {
    // Envolve os links com a tag Link do Inertia, caso haja link
    link: (children, href = null) => {
        if (href) return <Link href={href}>{children}</Link>;
        return children;
    },

    // Gera o ícone com a estilização correta, caso exista icone.
    getIcon: (item) => {
        if (item.icon)
            return item.icon({ fontSize: "35px", marginRight: "13px" });
    },

    // Função para verificar se algum filho tem a url da página atual
    checkDescendantsForPage: (item, targetPageUrl) => {
        if (item?.submenu) {
            for (const subItem of item.submenu) {
                if (subItem.url === targetPageUrl) {
                    return true;
                }

                if (subItem.submenu) {
                    const hasDescendantInPage =
                        utilsFunctions.checkDescendantsForPage(
                            subItem,
                            targetPageUrl
                        );

                    if (hasDescendantInPage) {
                        return true;
                    }
                }
            }
        }

        return false;
    },
};

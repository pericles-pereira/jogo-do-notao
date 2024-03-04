import { AdminPanelSettings, DashboardOutlined, ManageAccountsOutlined, PersonAddAlt1Outlined } from "@mui/icons-material";
import helpers from "./helpers/menuHelpers";
const {IconWrapper, menuFormatter} = helpers;

const menu = [
    {
        text: 'Dashboard',
        url: '/dashboard',
        icon: IconWrapper(DashboardOutlined)
    },
    {
        header: 'Administração',
    },
    {
        text: 'Usuários',
        icon: IconWrapper(AdminPanelSettings),
        can: "teste",
        submenu: [
            {
                text: 'Registrar',
                url: '/register',
                icon: IconWrapper(PersonAddAlt1Outlined)
            },
            {
                text: 'Gerenciar',
                url: '/users',
                icon: IconWrapper(ManageAccountsOutlined)
            },
        ]
    },
];

export default (permissions = []) => menuFormatter(menu, permissions);

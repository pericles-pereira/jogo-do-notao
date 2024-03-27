import {
    AdminPanelSettings,
    DashboardOutlined,
    List,
    ManageAccountsOutlined,
    PersonAddAlt1Outlined,
} from "@mui/icons-material";
import helpers from "./helpers/menuHelpers";
const { IconWrapper, menuFormatter } = helpers;

const menu = [
    {
        text: "Dashboard",
        url: route("dashboard"),
        icon: IconWrapper(DashboardOutlined),
    },
    {
        text: "Questões",
        url: route("questions"),
        icon: IconWrapper(List),
    },
    {
        text: "Usuários",
        icon: IconWrapper(AdminPanelSettings),
        submenu: [
            {
                text: "Registrar",
                url: route("register"),
                icon: IconWrapper(PersonAddAlt1Outlined),
            },
            {
                text: "Gerenciar",
                url: route("users"),
                icon: IconWrapper(ManageAccountsOutlined),
            },
        ],
    },
];

export default (permissions = []) => menuFormatter(menu, permissions);

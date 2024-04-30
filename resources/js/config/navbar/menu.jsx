import {
    AdminPanelSettings,
    Category,
    Games,
    List,
    ListAlt,
    ManageAccountsOutlined,
    PersonAddAlt1Outlined,
} from "@mui/icons-material";
import helpers from "./helpers/menuHelpers";
const { IconWrapper, menuFormatter } = helpers;

const menu = [
    {
        text: "Jogos",
        url: route("game.manage"),
        icon: IconWrapper(Games),
    },
    {
        text: "Questões",
        icon: IconWrapper(ListAlt),
        submenu: [
            {
                text: "Gerenciar Questões",
                url: route("questions"),
                icon: IconWrapper(List),
            },
            {
                text: "Categorias",
                url: route("category"),
                icon: IconWrapper(Category),
            },
        ],
    },
    {
        text: "Usuários",
        icon: IconWrapper(AdminPanelSettings),
        can: "master",
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

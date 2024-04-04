import {
    AdminPanelSettings,
    Category,
    DashboardOutlined,
    Games,
    GamesOutlined,
    List,
    ListAlt,
    ManageAccountsOutlined,
    PersonAddAlt1Outlined,
    PlayArrow,
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
        text: "Jogo do Notão",
        icon: IconWrapper(Games),
        submenu: [
            {
                text: "Iniciar Partida",
                url: route("game.start"),
                icon: IconWrapper(PlayArrow),
            },
            {
                text: "Gerenciar Jogos",
                url: route("game.manage"),
                icon: IconWrapper(GamesOutlined),
            },
        ],
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

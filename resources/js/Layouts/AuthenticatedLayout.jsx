import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useLoader } from "@/Context/LoaderContext";
import { Loaders } from "@/Components/Template/StandbyLoaders/Loaders";
import { Head, usePage } from "@inertiajs/react";
import { toast, ToastComponent } from "@/utils/common/Toast";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/Components/Template/Sidebar/Sidebar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Appbar from "@/Components/Template/Appbar/Appbar";

const defaultTheme = createTheme({
    palette: {
        linearGradientNavbarColor: "var(--linear-gradient-navbar-color)",
    },
});

export default function AuthenticatedLayout({ children, title = "" }) {
    const pageProps = usePage().props;

    const user = pageProps?.auth?.user;
    const permissions = pageProps?.permissions;
    const status = pageProps?.status;

    React.useEffect(() => {
        if (status && status.type) {
            if (["success", "error", "info", "warn"].includes(status.type)) {
                toast[status.type](status?.message ?? "");
            }
        }
    }, [status]);

    const { loading } = useLoader();

    return (
        <ThemeProvider theme={defaultTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: "flex" }}>
                    <Head title={title} />

                    <CssBaseline />

                    <Appbar user={user} title={title} />

                    <Loaders.LoaderOverlay />

                    <ToastComponent />

                    <Sidebar permissions={permissions} />

                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === "light"
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            minHeight: "100vh",
                        }}
                    >
                        <Toolbar />
                        <React.Suspense fallback={<Loaders.SuspenseLoader />}>
                            {!loading && (
                                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                                    <Grid container>{children}</Grid>
                                </Container>
                            )}
                        </React.Suspense>
                    </Box>
                </Box>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

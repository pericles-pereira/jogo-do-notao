import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Copyright from "@/Components/Template/Footer/Copyright";
import AppBar from "@/Components/Template/AppBar/Appbar";
import { useLoader } from "@/Context/LoaderContext";
import { Loaders } from "@/Components/Template/StandbyLoaders/Loaders";
import { Head, usePage } from "@inertiajs/react";
import { ToastComponent } from "@/utils/common/Toast";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/Components/Template/Sidebar/Sidebar";

const defaultTheme = createTheme({
    palette: {
        linearGradientNavbarColor: "var(--linear-gradient-navbar-color)",
    },
});

export default function AuthenticatedLayout({ children, title = '' }) {
    const pageProps = usePage().props;

    const user = pageProps?.auth?.user;
    const permissions = pageProps?.permissions;

    const { loading } = useLoader();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: "flex" }}>
                <Head title={title} />

                <CssBaseline />

                <AppBar user={user} />

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
                                <Copyright sx={{ pt: 4 }} />
                            </Container>
                        )}
                    </React.Suspense>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

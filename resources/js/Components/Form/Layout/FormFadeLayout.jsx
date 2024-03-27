import { Container, Fade, Grid, Paper, Typography } from "@mui/material";

export default function FormFadeLayout({ components, submit, size = "medium" }) {
    return (
        <Container
            maxWidth="xl"
            sx={{
                py: 8,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Grid
                component="form"
                id="register-form"
                onSubmit={submit}
                container
                spacing={6}
                sx={{ alignItems: "center", justifyContent: "center" }}
            >
                {components && components.map(([component, options]) => (
                    <Fade in={options.fade} translate="yes" timeout={800} key={options?.id ?? options?.title}>
                        <Grid
                            item
                            xs={12}
                            md={10}
                            lg={8}
                            sx={{
                                ...(options.fade ? "" : { display: "none" }),
                            }}
                        >
                            <Paper
                                elevation={3}
                                sx={{
                                    padding: "16px",
                                    mb: "16px",
                                    textAlign: "center",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                                }}
                            >
                                <header>
                                    {options.title && (
                                        <Typography
                                            variant="h6"
                                            className="text-gray-900"
                                        >
                                            {options.title}
                                        </Typography>
                                    )}

                                    {options.subtitle && (
                                        <Typography
                                            variant="body2"
                                            className="mt-1 text-gray-600"
                                        >
                                            {options?.subtitle}
                                        </Typography>
                                    )}
                                </header>
                                <div className="mt-6 space-y-6">
                                    {component}
                                </div>
                            </Paper>
                        </Grid>
                    </Fade>
                ))}
            </Grid>
        </Container>
    );
}

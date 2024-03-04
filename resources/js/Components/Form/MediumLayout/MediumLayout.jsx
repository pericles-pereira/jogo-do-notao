import { Container, Grid, Paper, Typography } from "@mui/material";

export default function MediumLayout({ components }) {
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
                container
                spacing={6}
                sx={{ alignItems: "center", justifyContent: "center" }}
            >
                {components.map(([component, options]) => (
                    <Grid
                        item
                        xs={12}
                        md={10}
                        lg={8}
                        key={options?.id ?? options?.title}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                padding: "16px",
                                mb: "16px",
                                textAlign: "center",
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
                            {component}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

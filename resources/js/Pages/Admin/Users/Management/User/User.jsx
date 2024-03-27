import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import DefaultButton from "@/Components/Form/DefaultButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";
import { KeyboardBackspace } from "@mui/icons-material";
import UserDeleteCard from "./partials/UserDeleteCard";
import UserAccessCard from "./partials/UserAccessCard";
import UserPermissionCard from "./partials/UserPermissionCard";
import UserProfileCard from "./partials/UserProfileCard";

export default function User({ user, auth }) {
    const [userActive, setUserActive] = useState(user?.active);
    const permissionsForm = useForm(user?.permissions);
    const manipulateAccessForm = useForm([]);

    const submitPermissions = () => {
        permissionsForm.patch(route("user.permissions.patch", user?.id), {
            preserveScroll: true,
        });
    };

    const deactivateUser = () => {
        manipulateAccessForm.patch(
            route(
                userActive ? "user.disable.patch" : "user.activate.patch",
                user?.id
            ),
            {
                preserveScroll: true,
                onSuccess: () => setUserActive(!userActive),
            }
        );
    };

    return (
        <AuthenticatedLayout title={`Perfil de ${user?.name}`}>
            <Container maxWidth="lg">
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12}>
                        <DefaultButton
                            type="button"
                            onClick={() => router.visit(route("users"))}
                            startIcon={<KeyboardBackspace fontSize="large" />}
                        >
                            Voltar
                        </DefaultButton>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <UserProfileCard user={user} />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            minHeight: "70vh",
                            padding: "16px",
                            mb: "16px",
                            gap: "16px",
                        }}
                    >
                        <UserPermissionCard
                            permissionsForm={permissionsForm}
                            submitPermissions={submitPermissions}
                        />
                        <UserAccessCard
                            userActive={userActive}
                            deactivateUser={deactivateUser}
                        />
                        <UserDeleteCard user={user} auth={auth} />
                    </Grid>
                </Grid>
            </Container>
        </AuthenticatedLayout>
    );
}

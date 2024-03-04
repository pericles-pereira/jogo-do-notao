import React, { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";
import DefaultButton from "@/Components/Form/DefaultButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import { Check, KeyboardBackspace } from "@mui/icons-material";
import defaultProfileImage from "@/assets/images/users/default_profile_image.png";
import Permissions from "../Shared/Permissions";
import { toast } from "@/utils/common/Toast";

export default function UserConfig({ status, user }) {
    const [copyState, setCopyState] = useState(false);
    const [userPermissions, setUserPermissions] = useState(user?.permissions);

    useEffect(() => {
        if (status && status.type) toast[status.type](status?.message);
    }, [status]);

    return (
        <AuthenticatedLayout title={user?.name}>
            <Container maxWidth="lg">
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12}>
                        <DefaultButton
                            type="button"
                            onClick={() => router.visit(route("users"))}
                            startIcon={<KeyboardBackspace fontSize="large" />}
                        >
                            Return
                        </DefaultButton>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                minHeight: "70vh",
                                padding: "16px",
                                mb: "16px",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                            }}
                        >
                            <header
                                style={{ textAlign: "center", padding: "4px" }}
                            >
                                <Typography
                                    variant="h4"
                                    className="text-gray-900"
                                >
                                    {user.name.split(" ")[0]} Profile
                                </Typography>
                            </header>
                            <CardContent>
                                <div className="flex justify-center align-middle w-full mb-6">
                                    <img
                                        src={
                                            user?.profileImg ??
                                            defaultProfileImage
                                        }
                                        alt="Profile"
                                        className="rounded-full w-64 h-64 object-cover"
                                        style={{
                                            border: "2px solid rgba(0, 0, 0, 0.4)",
                                        }}
                                    />
                                </div>
                                <Typography>
                                    <strong>Name:</strong> {user.name}
                                </Typography>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <strong>Email:</strong>
                                    <a
                                        style={{
                                            color: "#1976D2",
                                            textDecoration: "underline",
                                            cursor: "pointer",
                                            position: "relative",
                                            marginLeft: "4px",
                                        }}
                                        title="Click to copy"
                                        onClick={async () => {
                                            await navigator.clipboard.writeText(
                                                user.email
                                            );
                                            setCopyState(true);
                                            setTimeout(
                                                () => setCopyState(false),
                                                3000
                                            );
                                        }}
                                    >
                                        {user.email}
                                    </a>
                                    {copyState && (
                                        <Box
                                            size="small"
                                            sx={{
                                                color: "green",
                                                marginLeft: "5px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                textAlign: "center",
                                                gap: "2px",
                                            }}
                                        >
                                            <Check fontSize="small" />{" "}
                                            <span
                                                style={{
                                                    marginTop: "2px",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Copied
                                            </span>
                                        </Box>
                                    )}
                                </Typography>
                                <Typography>
                                    <strong>Creation Date:</strong>{" "}
                                    {user.createdAt}
                                </Typography>
                                <Typography>
                                    <strong>Email Verification Date:</strong>{" "}
                                    {user.emailVerifiedAt ?? "--"}
                                </Typography>
                            </CardContent>
                        </Card>
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
                        <Card
                            sx={{
                                padding: "8px",
                                marginBottom: "20px",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                            }}
                        >
                            <CardContent>
                                <div>
                                    <header
                                        style={{
                                            textAlign: "center",
                                            padding: "0px 8px 8px 8px",
                                            gap: "2px",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            className="text-gray-900"
                                        >
                                            Permissions
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            className="mt-1 text-gray-600"
                                        >
                                            Register new system users by
                                            providing name and email.
                                        </Typography>
                                    </header>
                                    <Permissions
                                        permissions={userPermissions}
                                        setPermissions={setUserPermissions}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                padding: "8px",
                                marginBottom: "20px",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                <div>
                                    <header
                                        style={{
                                            textAlign: "center",
                                            padding: "2px",
                                            gap: "2px",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            className="text-gray-900"
                                            sx={{ marginBottom: "4px" }}
                                        >
                                            Deactivate user
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            className="mt-1 text-gray-600"
                                        >
                                            Disable the user and block their
                                            access to the system.
                                        </Typography>
                                    </header>
                                    <div style={{ paddingTop: "16px" }}>
                                        <DefaultButton
                                            color="error"
                                            size="medium"
                                        >
                                            Deactivate Account
                                        </DefaultButton>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                padding: "8px",
                                marginBottom: "20px",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                <div>
                                    <header
                                        style={{
                                            textAlign: "center",
                                            padding: "2px",
                                            gap: "2px",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            className="text-gray-900"
                                            sx={{ marginBottom: "4px" }}
                                        >
                                            Delete User
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            className="mt-1 text-gray-600"
                                            sx={{ maxWidth: "400px" }}
                                        >
                                            After this account is deleted, all
                                            your resources and data will be
                                            permanently deleted. Before deleting
                                            this account, download any data or
                                            information you want to retain.
                                        </Typography>
                                    </header>
                                    <div style={{ paddingTop: "16px" }}>
                                        <DefaultButton
                                            color="error"
                                            size="medium"
                                        >
                                            Delete Account
                                        </DefaultButton>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </AuthenticatedLayout>
    );
}

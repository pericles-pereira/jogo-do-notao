import { Card, CardContent, Typography } from "@mui/material";
import Permissions from "../../../shared/Permissions";

export default function UserPermissionCard({ permissionsForm, submitPermissions }) {
    return (
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
                        <Typography variant="h6" className="text-gray-900">
                            Permissões
                        </Typography>

                        <Typography
                            variant="body2"
                            className="mt-1 text-gray-600"
                        >
                            Altere as permissões deste usuário.
                        </Typography>
                    </header>
                    <Permissions
                        permissions={permissionsForm.data}
                        setPermissions={permissionsForm.setData}
                        submit={submitPermissions}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

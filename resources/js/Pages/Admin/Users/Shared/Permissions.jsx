import DefaultButton from "@/Components/Form/DefaultButton";
import { toSentenceCase } from "@/utils/common/strings";
import { Done, West } from "@mui/icons-material";
import { Checkbox, FormGroup, FormControlLabel, Box } from "@mui/material";
import React from "react";

export default function Permissions({
    toggleForm = null,
    permissions,
    setPermissions,
}) {
    const handleCheckboxChange = (permission) => {
        setPermissions((prevPermissions) => ({
            ...prevPermissions,
            [permission]: !prevPermissions[permission],
        }));
    };

    const data = Object.keys(permissions).map((permission, index) => ({
        id: `${index + 1}`,
        label: toSentenceCase(permission),
        checked: permissions[permission],
        onChange: () => handleCheckboxChange(permission),
    }));

    return (
        <FormGroup className="gap-1 items-start">
            {data.map((item) => (
                <FormControlLabel
                    key={item.id}
                    control={
                        <Checkbox
                            checked={item.checked}
                            value={item.id}
                            id={item.id}
                            onChange={item.onChange}
                        />
                    }
                    label={item.label}
                />
            ))}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: toggleForm ? "space-between" : "start",
                    width: "100%",
                    marginTop: "8px",
                }}
            >
                {toggleForm ? (
                    <>
                        <DefaultButton
                            type="button"
                            onClick={toggleForm}
                            className="gap-2"
                        >
                            <West />
                            Previous
                        </DefaultButton>

                        <DefaultButton
                            color="success"
                            onClick={toggleForm}
                            className="gap-2"
                        >
                            Register
                            <Done />
                        </DefaultButton>
                    </>
                ) : (
                    <DefaultButton size="medium">
                        <Done sx={{ marginBottom: "2px" }} />
                        <span style={{ marginLeft: "4px" }}>Salvar</span>
                    </DefaultButton>
                )}
            </Box>
        </FormGroup>
    );
}

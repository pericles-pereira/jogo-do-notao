import DefaultButton from "@/Components/Form/DefaultButton";
import InputError from "@/Components/Form/InputError";
import { East } from "@mui/icons-material";
import {
    FormControl,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import React from "react";

export default function Credentials({
    data,
    setData,
    errors,
    toggleForm,
    showCredentials,
    processing,
    permissions,
}) {
    const handleKeyDown = (event) => {
        if (showCredentials && event.key === "Enter") {
            event.preventDefault();
            toggleForm();
        }
    };

    return (
        <React.Fragment>
            <div onKeyDown={handleKeyDown}>
                <TextField
                    id="name"
                    name="name"
                    value={data.name}
                    fullWidth
                    autoFocus
                    autoComplete="name"
                    onChange={(e) => setData("name", e.target.value)}
                    required
                    variant="outlined"
                    label="Nome"
                    error={!!errors.name}
                />
                <InputError
                    message={errors.name}
                    className="flex justify-start"
                />
            </div>

            <div onKeyDown={handleKeyDown}>
                <TextField
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    fullWidth
                    autoComplete="username"
                    onChange={(e) => setData("email", e.target.value)}
                    required
                    variant="outlined"
                    label="Email"
                    error={!!errors.email}
                />
                <InputError
                    message={errors.email}
                    className="flex justify-start"
                />
            </div>

            {permissions.master && (
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <div className="flex flex-wrap">
                            <div
                                className="w-full md:w-4/12 pr-2"
                                onKeyDown={handleKeyDown}
                            >
                                <FormControl
                                    fullWidth
                                    variant="outlined"
                                    required
                                    error={!!errors.newGroup}
                                    style={{ minWidth: "200px" }}
                                >
                                    <InputLabel id="newGroupLabel">
                                        Novo Grupo
                                    </InputLabel>
                                    <Select
                                        labelId="newGroupLabel"
                                        id="newGroup"
                                        name="newGroup"
                                        value={data.newGroup}
                                        onChange={(e) =>
                                            setData("newGroup", e.target.value)
                                        }
                                        label="Novo Grupo"
                                        style={{ width: "100%" }}
                                    >
                                        <MenuItem value={true}>Sim</MenuItem>

                                        <MenuItem value={false}>Não</MenuItem>
                                    </Select>
                                    <InputError
                                        message={errors.newGroup}
                                        className="flex justify-start"
                                    />
                                </FormControl>
                            </div>

                            <div
                                className="w-full md:w-8/12"
                                onKeyDown={handleKeyDown}
                            >
                                <TextField
                                    id="groupName"
                                    type="groupName"
                                    name="groupName"
                                    value={data.groupName}
                                    fullWidth
                                    onChange={(e) =>
                                        setData("groupName", e.target.value)
                                    }
                                    required
                                    variant="outlined"
                                    label="Nome do Grupo"
                                    disabled={!data.newGroup}
                                    error={!!errors.groupName}
                                />
                                <InputError
                                    message={errors.groupName}
                                    className="flex justify-start"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`flex mt-4 ${
                    processing ? "justify-between" : "justify-end"
                }`}
            >
                {processing && (
                    <LinearProgress className="w-9/12 my-auto mx-auto" />
                )}
                <DefaultButton
                    type="button"
                    onClick={toggleForm}
                    disabled={processing}
                    className="gap-2"
                >
                    Próximo
                    <East />
                </DefaultButton>
            </div>
        </React.Fragment>
    );
}

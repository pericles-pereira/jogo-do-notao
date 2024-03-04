import DefaultButton from "@/Components/Form/DefaultButton";
import InputError from "@/Components/Form/InputError";
import { East } from "@mui/icons-material";
import { LinearProgress, TextField } from "@mui/material";
import React from "react";

export default function Credentials({ data, setData, errors, toggleForm, showCredentials, processing }) {
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
                    label="Name"
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
                    Next
                    <East />
                </DefaultButton>
            </div>
        </React.Fragment>
    );
}

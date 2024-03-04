import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import Credentials from "./Partials/Credentials";
import Permissions from "../Shared/Permissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { toast } from "@/utils/common/Toast";
import MediumLayoutFormFade from "@/Components/Form/MediumLayout/MediumLayoutFormFade";
import allPermissions from "../config/allUserPermissions.json";

export default function Register({ status }) {
    const [newUserPermissions, setNewUserPermissions] = useState(allPermissions);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        permissions: newUserPermissions
    });

    const [showCredentials, setShowCredentials] = useState(true);

    const toggleForm = () => setShowCredentials(!showCredentials);

    useEffect(() => {
        return () => {
            reset("name", "email");
        };
    }, []);

    useEffect(() => {
        if (status && status?.type === "success") {
            reset("name", "email");
            Object.keys(newUserPermissions).map((permission) =>
                setNewUserPermissions((prevPermissions) => ({
                    ...prevPermissions,
                    [permission]: false,
                }))
            );
        }

        if (status && status.type) {
            toast[status.type](status?.message);
        }
    }, [status]);

    useEffect(() => {
        setData('permissions', newUserPermissions);
    }, [newUserPermissions]);

    useEffect(() => {
        setShowCredentials(true);
    }, [processing]);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    const components = [
        [
            <Credentials
                data={data}
                setData={setData}
                errors={errors}
                toggleForm={toggleForm}
                showCredentials={showCredentials}
                processing={processing}
            />,
            {
                id: 1,
                title: "Register",
                subtitle: "Register new system users by providing name and email.",
                fade: showCredentials,
            },
        ],
        [
            <Permissions
                toggleForm={toggleForm}
                permissions={newUserPermissions}
                setPermissions={setNewUserPermissions}
            />,
            {
                id: 2,
                title: "Permissions",
                subtitle: "Set this user's permissions on the system.",
                fade: !showCredentials,
            },
        ],
    ];

    return (
        <AuthenticatedLayout title="Register">
            <MediumLayoutFormFade components={components} submit={submit} />
        </AuthenticatedLayout>
    );
};

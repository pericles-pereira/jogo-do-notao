import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import Credentials from "./Partials/Credentials";
import Permissions from "../shared/Permissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FormFadeLayout from "@/Components/Form/Layout/FormFadeLayout";
import allPermissions from "../config/allUserPermissions.json";

export default function Register() {
    const [newUserPermissions, setNewUserPermissions] =
        useState(allPermissions);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        permissions: newUserPermissions,
    });

    const [showCredentials, setShowCredentials] = useState(true);

    const toggleForm = () => setShowCredentials(!showCredentials);

    useEffect(() => {
        return () => {
            reset("name", "email");
        };
    }, []);

    useEffect(() => {
        setData("permissions", newUserPermissions);
    }, [newUserPermissions]);

    useEffect(() => {
        setShowCredentials(true);
    }, [processing]);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            preserveScroll: true,
            onSuccess: () => {
                reset("name", "email");
                Object.keys(newUserPermissions).map((permission) =>
                    setNewUserPermissions((prevPermissions) => ({
                        ...prevPermissions,
                        [permission]: false,
                    }))
                );
            },
        });
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
                title: "Registrar Usuário",
                subtitle:
                    "Cadastre novos usuários do sistema fornecendo nome e email.",
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
                title: "Permissões",
                subtitle: "Defina as permissões deste usuário no sistema.",
                fade: !showCredentials,
            },
        ],
    ];

    return (
        <AuthenticatedLayout title="Registrar Usuário">
            <FormFadeLayout components={components} submit={submit} />
        </AuthenticatedLayout>
    );
}

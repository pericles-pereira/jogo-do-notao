import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import Credentials from "./Partials/Credentials";
import Permissions from "../shared/Permissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FormFadeLayout from "@/Components/Form/Layout/FormFadeLayout";
import allPermissions from "../config/allUserPermissions.json";

export default function Register({ permissions }) {
    const [newUserPermissions, setNewUserPermissions] =
        useState(allPermissions);
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        setError,
        clearErrors,
    } = useForm({
        name: "",
        email: "",
        newGroup: false,
        groupName: "",
        permissions: newUserPermissions,
    });

    const [showCredentials, setShowCredentials] = useState(true);

    const toggleForm = () => setShowCredentials(!showCredentials);

    useEffect(() => {
        if (!data.newGroup) reset("groupName");
    }, [data.newGroup]);

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
        clearErrors();
        if (data.newGroup) {
            if (data.groupName.length < 5) {
                setError(
                    "groupName",
                    "Informe ao menos 5 caracteres para o nome do grupo"
                );
                return;
            }
        }

        post(route("register"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
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
                permissions={permissions}
            />,
            {
                id: 1,
                title: "Registrar Usuário",
                subtitle: `O usuário será adicionado ao seu grupo, tendo acesso as questões, informações de alunos e demais informações do seu grupo. ${
                    permissions.master
                        ? "Caso queira que ele seja independente, crie um grupo para ele."
                        : "Defina suas permissões na próxima etapa do cadastro."
                }`,
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

import * as React from "react";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FormLayout from "@/Components/Form/Layout/FormLayout";
import UpdateProfileImageForm from "./Partials/UpdateProfileImageForm";

export default function Edit({ auth, mustVerifyEmail, status }) {
    const components = [
        [<UpdateProfileImageForm user={auth?.user} status={status} />, {id: 1, title: "Foto de Perfil", subtitle: "Atualize a foto de perfil da sua conta."}],
        [<UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />, {
            id: 2,
            title: "Informações do Perfil",
            subtitle: "Atualize as informações de perfil e endereço de e-mail da sua conta.",
        }],
        [<UpdatePasswordForm />, {
            id: 3,
            title: "Atualizar Senha",
            subtitle: "Certifique-se de que sua conta esteja usando uma senha longa e aleatória para permanecer segura.",
        }],
    ];

    return (
        <AuthenticatedLayout title="Perfil">
            <FormLayout components={components} />
        </AuthenticatedLayout>
    );
}

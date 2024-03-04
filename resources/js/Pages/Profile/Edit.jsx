import * as React from "react";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MediumLayout from "@/Components/Form/MediumLayout/MediumLayout";
import UpdateProfileImageForm from "./Partials/UpdateProfileImageForm";

export default function Edit({ auth, mustVerifyEmail, status }) {
    const components = [
        [<UpdateProfileImageForm user={auth?.user} status={status} />, {id: 1, title: "Profile Picture", subtitle: "Update your account profile picture."}],
        [<UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />, {
            id: 2,
            title: "Profile Information",
            subtitle: "Update your account's profile information and email address.",
        }],
        [<UpdatePasswordForm />, {
            id: 3,
            title: "Update Password",
            subtitle: "Ensure your account is using a long, random password to stay secure.",
        }],
    ];

    return (
        <AuthenticatedLayout title="Profile">
            <MediumLayout components={components} />
        </AuthenticatedLayout>
    );
}

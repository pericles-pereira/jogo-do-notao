import DefaultButton from "@/Components/Form/DefaultButton";
import { useForm } from "@inertiajs/react";
import { Box, Button, Collapse, Typography } from "@mui/material";
import { useRef, useState } from "react";
import defaultProfileImage from "@/assets/images/users/default_profile_image.png";
import { toast } from "@/utils/common/Toast";

export default function UpdateProfileImageForm({ user }) {
    const fileInputRef = useRef(null);

    const [profileImage, setProfileImage] = useState(null);
    const [loadedFile, setLoadedFile] = useState(null);
    const [loadingFile, setLoadingFile] = useState(false);

    const { data, setData, patch, processing, reset } = useForm({ image: "" });

    const handleImageChange = (e) => {
        setLoadingFile(true);
        const file = e.target.files[0];
        if (file) {
            if (file.type && file.type.indexOf("image") === -1) {
                toast.error(
                    "Por favor, selecione um arquivo de imagem válido."
                );
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
                setData("image", reader.result.split(",")[1]);
            };
            reader.readAsDataURL(file);
            setLoadedFile(file);
        }
        setLoadingFile(false);
    };

    const handleChooseFile = () => {
        fileInputRef.current.click();
    };

    const submit = (e) => {
        e.preventDefault();

        if (data.image.length === 0) {
            toast.warn("Selecione uma imagem.");
            return;
        }

        patch(route("profile.image"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setProfileImage(null);
                setLoadedFile(null);
            },
        });
    };

    return (
        <Box component="form" onSubmit={submit} encType="multipart/form-data">
            <div className="flex justify-center align-middle mt-4 w-full">
                <img
                    src={
                        profileImage ?? user?.profile_img ?? defaultProfileImage
                    }
                    alt="Profile Picture"
                    onClick={handleChooseFile}
                    className="rounded-full w-96 h-96 object-cover cursor-pointer"
                    style={{ border: "2px solid rgba(0, 0, 0, 0.4)" }}
                />
            </div>
            <div className="flex justify-between mt-4">
                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <div className="flex items-end justify-start gap-4">
                        <Button
                            variant={!!loadedFile ? "outlined" : "text"}
                            size="large"
                            onClick={handleChooseFile}
                            component="span"
                            disabled={loadingFile || processing}
                        >
                            <Typography>Escolher Arquivo</Typography>
                        </Button>
                        <Collapse in={!!loadedFile}>
                            <Typography
                                variant="subtitle1"
                                className="text-gray-700"
                            >
                                {loadedFile?.name}
                            </Typography>
                            <hr />
                        </Collapse>
                    </div>
                </div>
                <div className="flex justify-end items-center gap-4">
                    <DefaultButton disabled={processing}>
                        <Typography>Salvar Imagem</Typography>
                    </DefaultButton>
                </div>
            </div>
        </Box>
    );
}

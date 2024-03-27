import { useLoader } from "@/Context/LoaderContext";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export const Loaders = {
    LoaderOverlay: () => {
        const { loading } = useLoader();
        const [visible, setVisible] = useState(true);

        useEffect(() => {
            if (!loading) {
                const timeoutId = setTimeout(() => {
                    setVisible(false);
                }, 500);

                return () => clearTimeout(timeoutId);
            }
        }, [loading]);

        return (
            visible && (
                <LoadingAnimation className={loading ? "loading" : "loaded"} />
            )
        );
    },

    SuspenseLoader: () => {
        const [visible, setVisible] = useState(true);

        useEffect(() => {
            return () => {
                const timeoutId = setTimeout(() => {
                    setVisible(false);
                }, 500);

                return () => clearTimeout(timeoutId);
            };
        }, []);

        return visible && <LoadingAnimation />;
    },
};

const LoadingAnimation = ({ className = "loading" }) => (
    <StyledLoader className={className}>
        <ThreeDots
            visible={true}
            height="80"
            width="150"
            color="rgba(25, 118, 210, 1)"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    </StyledLoader>
);

const StyledLoader = styled(Box)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1500;
    transition: opacity 0.5s ease;

    &.loading {
        opacity: 1;
    }

    &.loaded {
        opacity: 0;
    }
`;

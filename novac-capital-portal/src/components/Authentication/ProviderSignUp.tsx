import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { deleteUser } from "firebase/auth";

import Copyright from "../Copyright";
import PhoneNumberInput from "./PhoneNumberInput";
import { CreateUser } from "@/utils/api";

import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { selectUser, setRegistered } from "@/features/user/userSlice";

type ProviderSignUpData = {
    email: string,
    phone: string,
};

type ErrorData = {
    code: string,
    message: string,
};

type Error = ErrorData|null;

function ProviderSignUp() {
    const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : undefined;
    const origin = searchParams ? searchParams.get("origin") : "";
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const [error, setError] = useState<Error>();

    const signUp = async (authData: ProviderSignUpData) => {
        // console.log("User:", user);

        if (!user)
            return;

        const createResult = await CreateUser(user.uid, user.email ?? authData.email, authData.phone);
        // console.log("Create user result:", !!createResult, createResult);
        if (createResult) {
            dispatch(setRegistered(true));
            router.push("/signin" + (origin ? ("?origin=" + origin) : ""));
        } else {
            const errorState: ErrorData = {
                code: "Not created",
                message: "Could not create the account. Please try again.",
            };
            deleteUser(user)
                .then(() => {
                    console.log("User deleted successfully");
                })
                .catch(error => {
                    console.log("Error while deleting user:", error);
                    errorState.code += " -> Not deleted";
                });
            console.log("Error:", errorState);
            setError(errorState);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const authData: ProviderSignUpData = {
            email: user?.email ?? "",
            phone: data.get("phone")?.toString() ?? "",
        };

        // console.log("Auth data:", authData);

        if (authData.email.length > 0 && authData.phone.length > 0) 
            signUp(authData);
    };

    useEffect(() => {
        if (!user)
            router.push("/signin");
    }, [user]);

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar
                    sx={{
                        width: "5rem",
                        height: "5rem",
                        m: 1,
                        bgcolor: "secondary.main"
                    }}
                    src="logo.png"
                    alt="Novac Capital logo"
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registrarse
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        label="Correo electrónico"
                        type="email"
                        value={user?.email}
                        autoFocus
                        disabled
                    />
                    <PhoneNumberInput name="phone" value={user?.phoneNumber} />
                    {error && (
                        <Alert variant="outlined" severity="error">
                            <AlertTitle>{error.code}</AlertTitle>
                            {error.message}
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Registrarse
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2" onClick={() => router.push("/signin")}>
                                ¿Ya tienes cuenta? Inicia sesión
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}

export default ProviderSignUp;
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
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth, googleProvider, CheckAdmin } from "@/utils/firebase";
import Copyright from "../Copyright";
import { CreateUser, GetUser, CreateApplication } from "@/utils/api";

import { useAppSelector } from "@/app/hooks";
import { selectParams } from "@/features/params/paramsSlice";
import { selectUser, UserValue } from "@/features/user/userSlice";
import { selectQuotation } from "@/features/quotation/quotationSlice";

type SignInData = {
    email: string,
    password: string,
};

type ErrorData = {
    code: string,
    message: string,
};

type Error = ErrorData|null;

function SignIn() {
    const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : undefined;
    const origin = searchParams ? searchParams.get("origin") : "";
    const newUser = searchParams ? Boolean(searchParams.get("new")) : false;
    const params = useAppSelector(selectParams);
    const quotation = useAppSelector(selectQuotation);
    const router = useRouter();
    const user = useAppSelector(selectUser);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>();

    const startLoading = () => setLoading(true);
    const endLoading = () => setLoading(false);

    const checkUserIsRegistered = async () => {
        console.log("Check user:", user);
        if (user) {
            const registered = await GetUser(user.uid);
            if (!registered) {
                const newUser = await CreateUser(user.uid, quotation?.formValues.name ?? "", user.email ?? "");
                if (newUser) {
                    console.log("User registered successfully");
                    return true;
                } else
                    console.log("Failed to register user");
            } else {
                console.log("User already registered");
                return true;
            }
        }
        return false;
    };

    const handleSignedIn = async (userLogged: UserValue) => {
        if (!user?.emailVerified) {
            console.log("Cuenta no verificada");
            setError({
                code: "Cuenta no verificada",
                message: "Verifica tu cuenta mediante el link enviado a tu e-mail y vuelve a intentar."
            });
            auth.signOut();
            endLoading();
            return;
        }

        const registered = await checkUserIsRegistered();
        if (registered)
            if (origin === "quotation" && params && quotation?.formValues && quotation.selectedPlan) {
                console.log("Redirect to files checklist", quotation);
                const application = await CreateApplication(
                    userLogged.uid,
                    (quotation.formValues.advancePercentage / 100),
                    quotation.selectedPlan.advancePayment,
                    quotation.formValues.totalLease,
                    quotation.selectedPlan.taxedPartialities,
                    quotation.selectedPlan.totalExpenses,
                    quotation.formValues.equipment,
                    quotation.formValues.amount,
                    params.iva,
                    quotation.selectedPlan.months
                );
                if (application)
                    router.push("/files_form");
                else {
                    const errorState = {
                        code: "unknown",
                        message: "Could not create application",
                    };
                    console.log("Error:", errorState, application);
                    setError(errorState);
                }
            } else
                router.push("/files_form");
        else {
            let admin = false;
            if (userLogged)
                admin = userLogged.admin;
            else
                admin = await CheckAdmin();
                
            if (admin)
                router.push("/admin_portal");
            else
            router.push("/");
        }
    };

    const handleGoogleSignIn = () => {
        startLoading();
        signInWithPopup(auth, googleProvider)
            .then(result => {
                // This gives you a Google Access Token. You can use it to access the Google API.   
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const googleUser = result.user;
                console.log("Credential:", credential);
                console.log("Token:", token);
                console.log("User:", googleUser);
                // handleSignedIn();
            })
            .catch(e => {
                const errorState = {
                    code: e.code,
                    message: e.message,
                    email: e.customData.email,
                    credential: GoogleAuthProvider.credentialFromError(e),
                };
                console.log("Error:", errorState);
                setError(errorState);
                endLoading()
            });
    };

    const signIn = async (authData: SignInData) => {
        startLoading();
        signInWithEmailAndPassword(auth, authData.email, authData.password)
            .then(userCredential => {
                // Signed In
                console.log("User:", userCredential.user);
                // handleSignedIn();
            })
            .catch(e => {
                const errorState: ErrorData = {
                    code: e.code,
                    message: e.message,
                };
                console.log("Error:", errorState);
                setError(errorState);
                endLoading()
            });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const authData: SignInData = {
            email: data.get("email")?.toString() ?? "",
            password: data.get("password")?.toString() ?? "",
        };
        signIn(authData);
    };

    useEffect(() => {
        if (user)
            handleSignedIn(user);
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
                    Iniciar Sesión
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
                        autoComplete="email"
                        autoFocus
                        disabled={loading}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        name="password"
                        label="Contraseña"
                        type="password"
                        autoComplete="current-password"
                        disabled={loading}
                    />
                    {newUser && !error && (
                        <Alert variant="outlined" severity="success">
                            <AlertTitle>Verifica tu cuenta</AlertTitle>
                            Verifica tu cuenta mediante el link enviado a tu e-mail antes de iniciar sesión.
                        </Alert>
                    )}
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
                        disabled={loading}
                    >
                        Ingresar
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 1, mb: 3 }}
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        Ingresar con Google
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" onClick={() => router.push("/password_reset")}>
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={() => router.push("/signup" + (origin ? ("?origin=" + origin) : ""))}>
                                ¿No tienes cuenta? Regístrate
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}

export default SignIn;
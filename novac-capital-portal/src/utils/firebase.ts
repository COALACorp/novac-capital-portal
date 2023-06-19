// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCeWjQQPBbZXBpb8xC830IPSWgpWf5wq4Q",
    authDomain: "novaccapital-65e2a.firebaseapp.com",
    projectId: "novaccapital-65e2a",
    storageBucket: "novaccapital-65e2a.appspot.com",
    messagingSenderId: "233323889630",
    appId: "1:233323889630:web:598bf620c3dbb77d01934f",
    measurementId: "G-60WY5KFSTZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google Authentication provider
const googleProvider = new GoogleAuthProvider();

const CheckAdmin = async (auth: Auth): Promise<boolean> => {
    const idToken = await auth.currentUser?.getIdTokenResult();
    return idToken?.claims.admin;
};

export default app;
export { auth, googleProvider, CheckAdmin };
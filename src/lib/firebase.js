// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDoc, query, where, getDocs } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { profileImg, profileName } from '../stores.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig;
async function setConfig() {
    return firebaseConfig = {
        apiKey: "redacted",
        authDomain: "printerbenchv3.firebaseapp.com",
        projectId: "printerbenchv3",
        storageBucket: "printerbenchv3.appspot.com",
        messagingSenderId: "355800794511",
        appId: "1:355800794511:web:aafb975f30d6ffada9f7fa",
        measurementId: "G-70RX08CJJV"
    };
}


let app;
if (!getApps().length) {
    app = initializeApp(await setConfig());
    console.log("Firebase initialized successfully");
  } else {
    app = getApps()[0];
    console.log("Firebase app already initialized");
  }

let db = await getFirestore(app);
export async function test() {
    // const ref = collection(db, "test");
    const docRef = doc(db, "test", "test");
    const docSnap = await getDoc(docRef);

    console.log(docSnap.data());
}
export async function addData(collectionName, StringifiedData) {
    StringifiedData = JSON.parse(StringifiedData)
    const docRef = await addDoc(collection(db, collectionName), {
        StringifiedData
    });
    console.log(StringifiedData);
}
export async function getData(collectionName) {
    let data = [];
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push(doc.data().StringifiedData);
    });
    return data;
}
export async function signIn() {
    try {
        console.log("ran");
        const provider = new GoogleAuthProvider();
        console.log("got provider");
        const auth = getAuth();
        console.log("got auth");
        const result = await signInWithPopup(auth, provider);
        console.log("signInWithPopup success");

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const uid = user.uid;

        profileImg.set(photoURL);
        profileName.set(displayName);
        console.log("User signed in:", user);
        console.log("Token:", token);
    } catch (error) {
        alert("Error during sign-in. Check the console for more information.")
        console.error("Error during sign-in:", error);

        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email; // Optional chaining in case customData is undefined
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log("Error code:", errorCode);
        console.log("Error message:", errorMessage);
        console.log("Error email:", email);
        console.log("Credential from error:", credential);
    }
}
export async function signOut() {
    const auth = getAuth();
    await auth.signOut();
    console.log("User signed out");
}
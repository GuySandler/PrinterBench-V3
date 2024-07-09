// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDoc, query, where, getDocs } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APIKEY,
    apiKey: "REDACTED",
    authDomain: "printerbenchv3.firebaseapp.com",
    projectId: "printerbenchv3",
    storageBucket: "printerbenchv3.appspot.com",
    messagingSenderId: "355800794511",
    appId: "1:355800794511:web:aafb975f30d6ffada9f7fa",
    measurementId: "G-70RX08CJJV"
};
console.log("Firebase Configuration:", firebaseConfig);
console.log("API Key:", firebaseConfig.apiKey);
let app = initializeApp(firebaseConfig);
let db = getFirestore(app);
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
    // const docRef = doc(db, collectionName);
    // const docSnap = await getDoc(docRef);
    // console.log(docSnap.data())
    // console.log(docSnap.data().StringifiedData)
    // console.log(docSnap.data().StringifiedData[0]);
    // return docSnap.data().StringifiedData[0];
    let data = [];
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push(doc.data().StringifiedData);
    });
    return data;
}
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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

        console.log("User signed in:", user);
        console.log("Token:", token);
    } catch (error) {
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

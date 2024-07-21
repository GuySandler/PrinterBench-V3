// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDoc, query, deleteDoc, getDocs, orderBy, limit} from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { profileImg, profileName } from '../stores.js';
import { PUBLIC_VITE_APIKEY } from '$env/static/public';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig;
async function setConfig() {
    return firebaseConfig = {
        apiKey: PUBLIC_VITE_APIKEY,
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
    console.log(data);
    if (data.length == 0) {console.log("error");throw new Error('No Docs Found');}
    return data;
}
export async function getCollections(OuterCollectionName, type) {
    const q = query(collection(db, OuterCollectionName));
    let data = [];
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc)
            // console.log(doc.id, " => ", doc.data());
            if (type == "id") {data.push(doc.id);}
            if (type == "data") {data.push(doc.data());}
            data.push({data: doc.data(), id: doc.id});
    });
    return data;
}
export async function getSubCollection(OuterCollectionName, InnerCollectionName, ExtraInnerCollectionName) {
    const Ref1 = collection(db, OuterCollectionName); // "approved"
    const Ref2 = collection(Ref1, InnerCollectionName, ExtraInnerCollectionName); // "mk3s+, cases"
    let data = [];
    
    try {
        const querySnapshot = await getDocs(Ref2);
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, '=>', doc.data());
            data.push(doc.data());
        });
        // console.log(data);
    } catch (error) {
        console.log("Error getting documents: ", error);
    }

    console.log(data);
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
export async function DeleteDoc(collection, Doc) {
    await deleteDoc(doc(db, collection, Doc));
}
export async function GetFilteredDocs(collection, filter) {
    const q = query(collection(db, collection), filter);
    let data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push(doc.data().StringifiedData);
    });
    if (data.length == 0) {console.log("error");throw new Error('No Docs Found');}
    return data;
}
export async function GetDashboardDocs(dataOption, printer) {
    let data = [];
    if (dataOption == "pending") {
        const q = query(collection(db, "pending"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            data.push(doc.data().StringifiedData);
        });
        if (data.length == 0) {console.log("error");throw new Error('No Docs Found');}
        return data[0];
    }
    else if (dataOption == "approved" || dataOption == "reviews") {
        // let test = await GetDashboardDocsId("approved")
        // console.log(test);
        // return test;
        console.log("approved")
        const q = query(collection(db, "approved"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            data.push(doc.id);
        });
        if (data.length == 0) {console.log("error");throw new Error('No Docs Found');}
        return data;
    }
}
export async function GetDashboardDocsId(name) {
    let data = [];
    const q = query(collection(db, name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push(doc.id);
    });
    if (data.length == 0) {console.log("error");throw new Error('No Docs Found');}
    return data;
}
export async function Approve(name, data) {
    // console.log(await getSubCollection(PendingData, "cases"));
    const Ref1 = collection(db, "approved");
    const Ref2 = collection(Ref1, data.name, "cases");
    await addDoc(Ref2, data); // fix nonexistant issue
    // addData("approved", PendingData);
    // DeleteDoc("pending", PendingData.id);
}
export async function GetReviews(data) {
    let GotReviews;
    GotReviews = await getSubCollection("approved", data.name, "reviews")
    console.log(GotReviews);
    return GotReviews;
}
export async function AddReview(data, review) {
    const Ref1 = collection(db, "approved");
    const Ref2 = collection(Ref1, data.name, "reviews");
    await addDoc(Ref2, review);
}
export async function GetLeaderboard(order = "name", printer = "",) {
    let data = [];
    let tempdata = [];
    if (printer!="") {
        data = await getSubCollection("approved", printer, "cases")
        if (data.length == 0) {console.log("error");throw new Error('No Docs Found');}
        else if (data.length == 1) {return data[0];}
        else {
            for (let i = 0; i < data.length; i++) {
                tempdata = [];
                tempdata.push(data[i].rating);
            }
            // for (let i = 0; i < tempdata.length; i++) {
            data[0].rating = tempdata.reduce((acc, val) => acc + val, 0) / tempdata.length;
            // }
        }
        return data[0];
    }
    else {
        const q = query(collection(db, "approved"), orderBy(order), limit(10));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            data.push(doc.id);
        });
        return data;
    }
}
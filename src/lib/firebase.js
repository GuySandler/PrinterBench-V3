// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "printerbenchv3.firebaseapp.com",
  projectId: "printerbenchv3",
  storageBucket: "printerbenchv3.appspot.com",
  messagingSenderId: "355800794511",
  appId: "1:355800794511:web:aafb975f30d6ffada9f7fa",
  measurementId: "G-70RX08CJJV"
};

// let app;
// let db;
// if (app != null) {
    let app = initializeApp(firebaseConfig);
    let db = getFirestore(app);
// }

export async function test() {
    // const ref = collection(db, "test");
    const docRef = doc(db, "test", "test");
    const docSnap = await getDoc(docRef);

    console.log(docSnap.data());
}
export async function addData(collectionName, StringifiedData) {
    const docRef = doc(db, collectionName, "test");
    StringifiedData = JSON.parse(StringifiedData);
    console.log(StringifiedData)
    console.log(StringifiedData[0])
    await setDoc(docRef, {
        StringifiedData[0]
    });
    console.log(StringifiedData);
}
export async function getData(collectionName) {
    const docRef = doc(db, collectionName, "test");
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data().StringifiedData);
    return docSnap.data().StringifiedData;
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDoc, query, where, getDocs } from "firebase/firestore";

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
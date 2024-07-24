// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDoc, query, deleteDoc, getDocs, setDoc} from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { profileImg, profileName, profileUid, profileFavs, } from '../stores.js';
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
    // console.log("Firebase initialized successfully");
  } else {
    app = getApps()[0];
    // console.log("Firebase app already initialized");
}

let db = await getFirestore(app);
export async function test() {
    // const ref = collection(db, "test");
    const docRef = doc(db, "test", "test");
    const docSnap = await getDoc(docRef);

    // console.log(docSnap.data());
}
export async function addData(collectionName, StringifiedData) {
    StringifiedData = JSON.parse(StringifiedData)
    const docRef = await addDoc(collection(db, collectionName), {
        StringifiedData
    });
    // console.log(StringifiedData);
}
export async function getData(collectionName) {
    let data = [];
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push(doc.data().StringifiedData);
    });
    // console.log(data);
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
    // const Ref2 = collection(Ref1, InnerCollectionName, ExtraInnerCollectionName); // "mk3s+, cases"
    const Ref2 = doc(Ref1, InnerCollectionName);
    const Ref3 = collection(Ref2, ExtraInnerCollectionName);
    let data = [];

    try {
        const querySnapshot = await getDocs(Ref3); // this is the problem
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        // const doc = await getDoc(Ref2); // this is the problem
        // console.log(doc.data());
    } catch (error) {
        console.log("Error getting documents: ", error);
    }
    // error is triggered here ^^^

    // console.log(data);
    return data;
}
export async function signIn() {
    try {
        // console.log("ran");
        const provider = new GoogleAuthProvider();
        // console.log("got provider");
        const auth = getAuth();
        // console.log("got auth");
        const result = await signInWithPopup(auth, provider);
        // console.log("signInWithPopup success");

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const uid = user.uid;


        const UserDocRef = doc(db, "users", uid);
        const UserDocSnap = await getDoc(UserDocRef);

        let UserFavs;
        if (UserDocSnap.exists()) {
            console.log("User already exists");
            console.log("User doc data:", UserDocSnap.data().favorites);
            UserFavs = UserDocSnap.data().favorites;
        } else {
            await setDoc(doc(db, "users", uid), {
                favorites: [],
            });
            console.log("User doc made");
            UserFavs = [];
        }

        profileImg.set(photoURL);
        profileName.set(displayName);
        profileFavs.set(UserFavs);
        profileUid.set(uid);
        // console.log("User signed in:", user);
        // console.log("Token:", token);
    } catch (error) {
        alert("Error during sign-in. Check the console for more information.")
        console.error("Error during sign-in:", error);

        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email; // Optional chaining in case customData is undefined
        const credential = GoogleAuthProvider.credentialFromError(error);

        // console.log("Error code:", errorCode);
        // console.log("Error message:", errorMessage);
        // console.log("Error email:", email);
        // console.log("Credential from error:", credential);
    }
}
export async function signOut() {
    const auth = getAuth();
    await auth.signOut();
    // console.log("User signed out");
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
        // console.log("approved")
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
    // console.log(GotReviews);
    return GotReviews;
}
export async function AddReview(data, review) {
    const Ref1 = collection(db, "approved");
    const Ref2 = collection(Ref1, data.name, "reviews");
    await addDoc(Ref2, review);
}

function FilterFeatures(printer, fields) {
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      let found = false;
      for (let key in printer) {
        if (key.toLowerCase() === field.toLowerCase() && printer[key] === true) {
          found = true;
          break;
        }
      }
      if (!found) return false;
    }
    return true;
}
export async function GetLeaderboard(order, printer = "", type = "all", features = [], name = "", brand = "") {
    let data = [];
    let returnData = []
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
        const q = query(collection(db, "approved"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            data.push(doc.id);
        });
        // console.log(data);
        // console.log(type);
        // console.log(features != []);
        // console.log(features);
        for (let i = 0; i < data.length; i++) {
            const subCollectionData = await getSubCollection("approved", data[i], "cases");
          
            let filteredData = type !== "all" ? subCollectionData.filter(item => item.type === type) : subCollectionData;
          
            // if (features.length !== 0) {
            //   filteredData = filteredData.filter(item => features.some(feature => item[feature] === true));
            // }

            returnData.push(...filteredData);

            if (features.length !== 0) {
                returnData = returnData.filter(printer => FilterFeatures(printer, features));
            }
          }
        // console.log(returnData);
        if (order == "name") returnData.sort();
        // console.log(order)
        else if  (order == "speed") returnData.sort((a, b) => b[0].speed - a[0].speed);
        else if (order == "points") returnData.sort((a, b) => b[0].points - a[0].points);
        else if (order == "price") returnData.sort((a, b) => b[0].price - a[0].price);
        // console.log(returnData);
        if (name != "") {
            returnData = returnData.filter(printer => printer.name.toLowerCase().includes(name.toLowerCase()));
        }
        if (brand != "") {
            returnData = returnData.filter(printer => printer.brand.toLowerCase().includes(brand.toLowerCase()));
        }
        // if (returnData.length == 0) {console.log("error");throw new Error('No Docs Found');}
        console.log(returnData);
        return returnData;
    }
}

// export async function userRulesTest() {
//     const approvedColRef = collection(db, "approved");
//     const querySnapshot = await getDocs(approvedColRef);

//     querySnapshot.forEach((doc) => {
//         console.log(doc.id);
//     });
// }
let profileFavorites = [];
profileFavs.subscribe((value) => {
    profileFavorites = value;
});
let profileUID = "";
profileUid.subscribe((value) => {
    profileUID = value;
});
export async function GetUserFavs() {
    const UserDocRef = doc(db, "users", profileUID);
    const UserDocSnap = await getDoc(UserDocRef);
    if (UserDocSnap.exists()) {
        // console.log(UserDocSnap.data().favorites);
        return UserDocSnap.data().favorites;
    } else {
        console.log("Failed to Get favorites");
        return [];
    }
}
export async function SetFavs(Favs) {
    const UserDocRef = doc(db, "users", profileUID);
    await setDoc(UserDocRef, {
        favorites: Favs,
    });
}
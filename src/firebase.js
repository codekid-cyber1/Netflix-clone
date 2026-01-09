import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore,  setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDN0Wy-ZlRDQ3JeyxdbCwKgEx_i70vwZDk",
  authDomain: "netflix-clone-837b8.firebaseapp.com",
  projectId: "netflix-clone-837b8",
  storageBucket: "netflix-clone-837b8.firebasestorage.app",
  messagingSenderId: "762058636400",
  appId: "1:762058636400:web:4dfcf8b17762ae9ee408b5"
};

const app = initializeApp(firebaseConfig);
const  auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email,password)
        const user = res.user 
        await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        });
    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' ') )
    }
}

const login= async(email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password)
    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' ') )
    }
}
const logout = ()=>{
    signOut(auth);
}
export { auth, db, signup, login, logout };
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore";
import { db } from "../firebase/firebase";

const yashRef = collection(db, "loginData");

class LoginService {
  signin = () => {
    return getDocs(yashRef);
  };
}

export default new LoginService();

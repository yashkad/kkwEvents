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

const yashRef = collection(db, "events");

class EventService {
  addEvent = (newEvent) => {
    return addDoc(yashRef, newEvent);
  };

  updateEvent = (id, updatedEvent) => {
    const eventDoc = doc(db, "events", id);
    return updateDoc(eventDoc, updatedEvent);
  };

  deleteEvent = (id) => {
    const eventDoc = doc(db, "events", id);
    return deleteDoc(eventDoc);
  };

  getAllEvents = () => {
    return getDocs(yashRef);
  };

  getEvent = (id) => {
    const eventDoc = doc(db, "events", id);
    return getDoc(eventDoc);
  };
}

export default new EventService();

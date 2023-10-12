import { db } from "../firebase";
import {
collection,
addDoc,
} from "firebase/firestore";
const addToContactInfo = async ({ userId, phoneNumber, name}) => {
try {
await addDoc(collection(db, "contactinfo"), {
User_Id: userId,
Phone_Number: phoneNumber,
Name: name,
});
} 
catch (err) {
              console.log(err);
             }
};


export { addToContactInfo };
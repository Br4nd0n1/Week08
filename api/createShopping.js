import { db } from "../firebase";
import {
collection,
addDoc
} from "firebase/firestore";
const addToShopping = async ({ userId, amount, food}) => {
try {
await addDoc(collection(db, "shoppinglist"), {
User_Id: userId,
amount: amount,
food: food,
});
} catch (err) { 
                console.log(err); 
              }
};

export { addToShopping };
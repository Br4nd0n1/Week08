import React, { useEffect, useState } from "react";
import {
    Box,
    Heading,
    Link,
    Input,
    Button,
    useToast
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import {
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore";
import { db } from "../firebase";
import { addToContactInfo } from "../api/updateContactInfo";

const Profile = () => {
    const { isLoggedIn, user } = useAuth();
    const [itemData, setItemData] = useState(null);
    const [name, setName] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [heading, setHeading] = useState("Enter your Contact Info")
    const [phoneNumber, setPhoneNumber] = useState("");
    const toast = useToast();
    

    async function addContact() {
        if (!isLoggedIn) {
        toast({
        title: "You must be logged in to Update an Account",
        status: "error",
        duration: 9000,
        isClosable: true,
        });
        return;
        }
        const contact = {
        phoneNumber:phoneNumber,
        name: name,
        userId: user.uid,
        };
        await addToContactInfo(contact);
        setIsSaved(true)
        setHeading("Contact Info")
        alert("Contact Updated")
        };

    useEffect(() => {
        if (!user) {
            return;
        }

        const fetchData = async () => {
            const q = query(collection(db, 'contactinfo'), where('User_Id', '==', user.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setItemData(doc.data());
            });
        };

        fetchData();
    }, [user]);

    if (!itemData) {
        return (
        <Box mt={5}>
            <Heading as="h3" fontSize={"xl"}>
                {heading}
            </Heading>
            <Input disabled={isSaved} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input disabled={isSaved} placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <Button onClick={() => addContact()}
hidden={isSaved}>Save</Button>
            <Link href="/" color="blue.500">Back</Link>
        </Box>
        );
    }

    return (
<Box mt={5}>
<Heading as="h3" fontSize={"xl"}>
    Contact Info
</Heading>
<Input disabled="true" placeholder="Name" value={itemData.Name}/>
<Input disabled="true" placeholder="Phone Number" value={itemData.Phone_Number}/>
<Link href="/" color="blue.500">Back</Link>
</Box>
    );
};

export default Profile;


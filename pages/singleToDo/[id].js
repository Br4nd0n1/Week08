import React from "react";
import {
    Box,
    Heading,
    Link,
    Text,
    UnorderedList,
    ListItem
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase";


const SingleToDo = ({toDoData}) => {

    const { user } = useAuth() || {};
    if (!user) {
        return;
    }

    return (
        <Box m={5}>
            <Heading as="h3" fontSize={"xl"}>
                { toDoData.title }
            </Heading>
            <UnorderedList>
                <ListItem p={4}>
                    { toDoData.description }
                </ListItem>
                <ListItem p={4}>
                    { toDoData.status }
                </ListItem>
                <ListItem p={4}>
                    { toDoData.createdAt }
                </ListItem>
            </UnorderedList>
            <Link href="/" color="blue.500">Back</Link>
        </Box>
    );
};

export async function getServerSideProps(context) {

    let toDoData = null;
 
    const docRef = doc( db, 'todo', context.params.id );
    const docSnap = await getDoc(docRef);
    if ( docSnap.exists() ) {
        toDoData = docSnap.data();
    }

    return {
        props: {
                 toDoData
               }
    };
}


export default SingleToDo;

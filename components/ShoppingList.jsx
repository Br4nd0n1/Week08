import {
    Box,
    Link,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    } from "@chakra-ui/react";
    import React, { useEffect } from "react";
    import useAuth from "../hooks/useAuth";
    import { collection, onSnapshot, query, where } from "firebase/firestore";
    import { db } from "../firebase";

    const ShoppingList = () => {
    const [shopping, setshopping] = React.useState([]);
    const {  user } = useAuth();
    const toast = useToast();
    const refreshData = () => {
    if (!user) {
    setshopping([]);
    return;
    }
    const q = query(collection(db, "shoppinglist"), where("User_Id", "==", user.uid));
    onSnapshot(q, (querySnapchot) => {
    let ar = [];
    querySnapchot.docs.forEach((doc) => {
    ar.push({ id: doc.id, ...doc.data() });
    });
    setshopping(ar);
    });
    };
    useEffect(() => {
    refreshData();
    }, [user]);

    return (
    <Box mt={5}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
    {shopping &&
    shopping.map((item) => (
    <Box
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    >
    <Heading as="h3" fontSize={"xl"}>Food Item</Heading>
    <Text>{item.food}</Text>
    <Text>{item.amount}</Text>
    <Link href={`/shoppingItems/${item.id}`} color="blue.500"> View</Link>
    </Box>
    ))}

    </SimpleGrid>
    </Box>
    );
    };
    export default ShoppingList;
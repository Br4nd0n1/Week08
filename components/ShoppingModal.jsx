
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react"
import {
  Box,
  Stack,
  Input,
  Textarea,
  useToast
  } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { addToShopping } from "../api/createShopping";
import useAuth from "../hooks/useAuth";

export function ShoppingModal() {
  const { isLoggedIn, user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [food, setFood] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const addShoppingItem = async () => {
    if (!isLoggedIn) {
    toast({
    title: "You must be logged in to create a shoppingItem",
    status: "error",
    duration: 9000,
    isClosable: true,
    });
    return;
    }
    setIsLoading(true);
    const shoppingItem = {
    food,
    amount,
    userId: user.uid,
    };
    await addToShopping(shoppingItem);
    setFood("");
    setAmount("");
    onClose();
    toast({ title: "shoppingItem created successfully", status: "success" });
    };


   return (
    <>
      <Button onClick={onOpen} color="yellow.500">Add To Shoping List</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Shopping Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input
placeholder="amount"
value={amount}
onChange={(e) => setAmount(e.target.value)}
/>
<Textarea
placeholder="food"
value={food}
onChange={(e) => setFood(e.target.value)}
/>

<Button
onClick={() => addShoppingItem()}
disabled={amount.length < 1 || food.length < 1 || isLoading}
variantColor="teal"
variant="solid"
>
Add
</Button>
</Stack>
</Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default ShoppingModal;

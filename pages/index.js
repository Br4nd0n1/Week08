import { Container } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import ShoppingList from "../components/ShoppingList";
import  ShoppingModal  from '../components/ShoppingModal';

export default function Home() {
return (
<Container maxW="7xl">
<Auth />
<br></br>
<ShoppingModal />
<AddTodo />
<TodoList />
<ShoppingList />
</Container>
);
}
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./components/Layout";
import { TodoList } from "./TodoList";

export default function App() {
  return (
    <ChakraProvider>
      <Layout>
        <TodoList />
      </Layout>
    </ChakraProvider>
  );
}

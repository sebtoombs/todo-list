import React from "react";
import { Box } from "@chakra-ui/react";

export default function Layout({ children, ...props }) {
  return (
    <Box maxW="3xl" mx="auto" py="20" {...props}>
      {children}
    </Box>
  );
}

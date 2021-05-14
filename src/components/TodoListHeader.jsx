import React from "react";
import { Box, Grid, Text, Button } from "@chakra-ui/react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function TodoListHeader({
  sortBy,
  sortDir,
  setSortBy,
  setSortDir,
}) {
  return (
    <Box minW="100%" px="4">
      <Grid gridTemplateColumns="6rem auto 8rem 2rem" gap="4">
        <Box>
          <Text fontSize="sm" fontWeight="bold">
            Completed
          </Text>
        </Box>
        <Box>
          <Button
            variant="link"
            color="black"
            fontSize="sm"
            fontWeight="bold"
            leftIcon={
              sortBy === "taskName" ? (
                sortDir === "asc" ? (
                  <BiChevronUp />
                ) : (
                  <BiChevronDown />
                )
              ) : undefined
            }
            textDecoration="underline"
            onClick={() => {
              if (sortBy !== "taskName") {
                setSortBy("taskName");
                setSortDir("desc");
              } else {
                setSortDir(sortDir === "asc" ? "desc" : "asc");
              }
            }}
            aria-label="Sort by task name"
          >
            Task
          </Button>
        </Box>
        <Box>
          <Button
            variant="link"
            color="black"
            fontSize="sm"
            fontWeight="bold"
            leftIcon={
              sortBy === "priority" ? (
                sortDir === "asc" ? (
                  <BiChevronUp />
                ) : (
                  <BiChevronDown />
                )
              ) : undefined
            }
            textDecoration="underline"
            onClick={() => {
              if (sortBy !== "priority") {
                setSortBy("priority");
                setSortDir("desc");
              } else {
                setSortDir(sortDir === "asc" ? "desc" : "asc");
              }
            }}
            aria-label="Sort by task priority"
          >
            Priority
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}

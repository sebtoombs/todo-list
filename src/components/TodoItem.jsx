import React from "react";
import {
  Box,
  Flex,
  Grid,
  Checkbox,
  FormControl,
  Select,
  IconButton,
} from "@chakra-ui/react";
import { RiDeleteBin7Line } from "react-icons/ri";
import ucFirst from "../utils/ucFirst";
import { TODO_PRIORITY, TODO_STATUS } from "../constants";

export default function TodoItem({
  taskName,
  status,
  priority,
  removeTodo,
  updateTodo,
  id,
}) {
  return (
    <Box
      minW="100%"
      rounded="md"
      transition="0.2s opacity, 0.2s background-color"
      opacity={status === TODO_STATUS.completed ? "0.7" : "1"}
      shadow="md"
      px="4"
      py="3"
      className={"TodoItem"}
    >
      <Grid gridTemplateColumns="6rem auto 8rem 2rem" gap="4">
        <Flex alignItems="center">
          <Checkbox
            size="lg"
            aria-label="Todo completion status"
            isChecked={status === TODO_STATUS.completed}
            onChange={(e) =>
              updateTodo(id, {
                status: e.target.checked
                  ? TODO_STATUS.completed
                  : TODO_STATUS.incomplete,
              })
            }
          />
        </Flex>
        <Flex alignItems="center">{taskName}</Flex>
        <Box>
          <FormControl id={`priority-${id}`}>
            <Select
              size="sm"
              value={priority}
              onChange={(e) => updateTodo(id, { priority: e.target.value })}
            >
              {Object.keys(TODO_PRIORITY).map((priority, index) => (
                <option value={priority} key={index}>
                  {ucFirst(priority)}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <IconButton
            variant="ghost"
            colorScheme="red"
            aria-label={`Remove todo item: ${taskName}`}
            icon={<RiDeleteBin7Line />}
            onClick={() => removeTodo(id)}
          />
        </Box>
      </Grid>
    </Box>
  );
}

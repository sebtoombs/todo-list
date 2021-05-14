import {
  VStack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Wrap,
  WrapItem,
  Stat,
  StatLabel,
  StatNumber,
  Switch,
} from "@chakra-ui/react";
import React, { useState, useMemo } from "react";
import useStateWithLocalStorage from "./hooks/useStateWithLocalStorage";
import { MdAdd } from "react-icons/md";
import TodoListHeader from "./components/TodoListHeader";
import TodoItem from "./components/TodoItem";
import Button from "./components/Button";

import { TODO_PRIORITY, TODO_STATUS } from "./constants";

// This is a sort of pseudo type/class to help set up
// default todo Item states. This is an extremely
// simple implementation.
function Todo({
  status = TODO_STATUS.incomplete,
  taskName = "",
  priority = TODO_PRIORITY.normal,
} = {}) {
  return {
    status,
    taskName,
    priority,
  };
}

export function TodoList() {
  // Set up all our state hooks

  // The main event: state for our todos
  const [todoList, setTodoList] = useStateWithLocalStorage([]);

  // State for the "add task" input
  const [newTaskName, setNewTaskName] = useState("");

  // State for the sort dimension
  const [sortBy, setSortBy] = useState(null);
  // State for sort direction
  const [sortDir, setSortDir] = useState("desc");

  // STate for "hide completed"
  const [shouldHideCompleted, setShouldHideCompleted] = useState(false);

  // And use a memo-ized version of the todoList to actually display all the filters, sorting etc
  // Whether using memo-ization is actually of benefit here is probably a toss up.
  const todoListSortedFiltered = useMemo(() => {
    return todoList
      .map((todoItem, index) => {
        // Save the index for later so we can update/remove sorted/filtered items
        todoItem.id = index;
        return todoItem;
      })
      .filter((todoItem) => {
        // Filter completed items if appropriate
        return shouldHideCompleted
          ? todoItem.status !== TODO_STATUS.completed
          : true;
      })
      .sort((itemA, itemB) => {
        // Apply sorting if appropriate

        // Skip early if no sortBy
        // It would be fractionally more performant to check this earlier, and skip the whole
        // .sort method, but we can safely assume the list of todos won't be long enough to
        // impact perf. And it saves an "if"
        if (
          !sortBy ||
          typeof itemA[sortBy] === "undefined" ||
          typeof itemB[sortBy] === "undefined"
        )
          return 0;

        // If the sort dir is ascending, and we have a comparison (later), we'll return
        // 1, otherwise -1. This just saves a few "if" statements
        const sortReturn = sortDir === "asc" ? 1 : -1;

        // Sure, this is a bit WET, but it'll do at this simplicity level
        // Essentially, for each item (a,b) we grab the value to sort by based on "sortBy"
        // for the taskname, this is easy (use taskName)
        // for priority, we grab the keys of the "enum", flip them so asc/desc make sense
        // then sort by index
        const sortValueA =
          sortBy === "priority"
            ? Object.keys(TODO_PRIORITY)
                .reverse()
                .findIndex((priority) => priority === itemA.priority)
            : itemA[sortBy];

        const sortValueB =
          sortBy === "priority"
            ? Object.keys(TODO_PRIORITY)
                .reverse()
                .findIndex((priority) => priority === itemB.priority)
            : itemB[sortBy];

        // Compare the sort values and actually tell the sort method how to sort these if appropriate
        if (sortValueA > sortValueB) return sortReturn;
        if (sortValueA < sortValueB) return -1 * sortReturn;

        return 0; // Winner, these items are equal
      });
  }, [JSON.stringify(todoList), sortBy, sortDir, shouldHideCompleted]);

  // A helper method to update state when adding a todo
  // For a little app like this, this is the way to go
  // For a big app, we might consider some state management
  // with better patterns
  const addTodo = (taskName) => {
    const newTodo = Todo({ taskName });
    setTodoList((_todoList) => {
      _todoList.push(newTodo);
      return _todoList;
    });
    // Alternatively, we could do
    // setTodoList([...todoList, newTodo])
    // However it's slightly less performant (slightly)
  };

  // Again, another helper to remove a todo
  const removeTodo = (index) => {
    const _todoList = [...todoList];
    _todoList.splice(index, 1);
    setTodoList(_todoList);
  };

  // And again for the update method
  // There are a few ways we might do this,
  // but I'm simply accepting some new state and merging it
  // The drawback here is that if we need to unset a prop,
  // we can't. I'm ok with that in this app, but it
  // should be noted.
  const updateTodo = (index, newTodoState) => {
    const _todoList = [...todoList];
    _todoList[index] = { ..._todoList[index], ...newTodoState };
    setTodoList(_todoList);
  };

  // Very simple input change handler for the new task name.
  const onChangeNewTaskName = (e) => {
    setNewTaskName(e.target.value);
  };

  // The new task input is in a form, so we handle the submit
  // event of the form in order to add a new task
  const handleSubmitNewTaskForm = (e) => {
    // Prevent the default browser form submit
    e.preventDefault();

    // If the task name is empty, abort.
    // We could do more validation here if it was necessary
    if (!newTaskName) {
      return;
    }

    // Finally, add the new todo, and reset the new task name
    addTodo(newTaskName);
    setNewTaskName("");
  };

  // Another simple event handler to handle
  // the change event for the hide completed switch
  const onChangeShouldHideCompleted = (e) => {
    setShouldHideCompleted(e.target.checked);
  };

  // The logic and view for this are separated into two components
  // Now, this is intended to a) keep code a bit more readable,
  // but also b) help with testing
  // It's worth noting though that this pattern is probably at it's
  // limit in this particular implementation, and we should probably
  // separate the view into a few sibling level components to avoid
  // as much prop drilling, or having to use context
  // Another point to note is that this is a lot of props to specify
  // and will quickly get a bit cumbersome. A better way would be to
  // plonk them all into an object and spread it into the TodoListView
  // ... probably.
  return (
    <TodoListView
      todoList={todoListSortedFiltered}
      addTodo={addTodo}
      removeTodo={removeTodo}
      updateTodo={updateTodo}
      newTaskName={newTaskName}
      onChangeNewTaskName={onChangeNewTaskName}
      handleSubmitNewTaskForm={handleSubmitNewTaskForm}
      sortBy={sortBy}
      sortDir={sortDir}
      setSortBy={setSortBy}
      setSortDir={setSortDir}
      shouldHideCompleted={shouldHideCompleted}
      onChangeShouldHideCompleted={onChangeShouldHideCompleted}
    />
  );
}

export function TodoListView({
  todoList,
  removeTodo,
  updateTodo,
  newTaskName,
  onChangeNewTaskName,
  handleSubmitNewTaskForm,
  sortBy,
  sortDir,
  setSortBy,
  setSortDir,
  shouldHideCompleted,
  onChangeShouldHideCompleted,
}) {
  return (
    <Box>
      <VStack spacing="6" sx={{ "&>*": { minW: "100%" } }}>
        <form onSubmit={handleSubmitNewTaskForm}>
          <Flex alignItems="flex-end">
            <FormControl id="taskName">
              <FormLabel fontSize="xl">Add a task</FormLabel>
              <Input
                type="text"
                placeholder="E.g. Complete coding challenge"
                value={newTaskName}
                onChange={onChangeNewTaskName}
              />
            </FormControl>
            <Box ml="3">
              <Button
                leftIcon={<MdAdd />}
                isDisabled={!newTaskName}
                colorScheme="green"
                type="submit"
              >
                Add task
              </Button>
            </Box>
          </Flex>
        </form>
        <Wrap spacing="6">
          <WrapItem>
            <FormControl id="hideCompleted">
              <FormLabel>Hide completed</FormLabel>
              <Switch
                isChecked={shouldHideCompleted}
                onChange={onChangeShouldHideCompleted}
              />
            </FormControl>
          </WrapItem>
          <Box flexGrow="1" />
          <WrapItem>
            <Stat>
              <StatLabel>Total tasks</StatLabel>
              <StatNumber data-testid="total-tasks-count">
                {todoList.length}
              </StatNumber>
            </Stat>
          </WrapItem>
          <WrapItem>
            <Stat>
              <StatLabel>Completed tasks</StatLabel>
              <StatNumber>
                {
                  todoList.filter(
                    (todo) => todo.status === TODO_STATUS.completed
                  ).length
                }
              </StatNumber>
            </Stat>
          </WrapItem>
        </Wrap>
        <VStack>
          <TodoListHeader
            sortBy={sortBy}
            sortDir={sortDir}
            setSortBy={setSortBy}
            setSortDir={setSortDir}
          />
          {todoList.map((todoItem, index) => (
            <TodoItem
              {...todoItem}
              key={index}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}

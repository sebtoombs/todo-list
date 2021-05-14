import React from "react";
// import { render } from "../testUtils";
import { TodoList } from "../src/TodoList";
import { screen } from "@testing-library/dom";

import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";

// The tests here test to core functionality of the todolist, intending to replicate
// how a user would expect to interact with it
// https://testing-library.com/docs/guiding-principles

// I've neglected simpler unit tests for the sake of brevity

// Using the 'useStateWithLocalStorage' hook is nice, but unfortunately the
// localStorage will be persisted between tests. So to have nice 'immutable'
// tests, let's clear it after each test
// Of course ideally we'd test the localstorage functionality somewhere too
afterEach(() => {
  localStorage.clear();
});

it("Types in new task field", async () => {
  render(<TodoList />);

  userEvent.type(await screen.getByLabelText("Add a task"), "Hello, World!");

  expect(screen.getByLabelText("Add a task")).toHaveValue("Hello, World!");
});

it("Adds a todo", async () => {
  render(<TodoList />);

  userEvent.type(
    await screen.getByLabelText("Add a task"),
    "Hello, World!{enter}"
  );

  expect(await screen.getByText("Hello, World!")).toBeInTheDocument();
  expect(await screen.getByTestId("total-tasks-count")).toHaveTextContent(1);
});

it("Adds and removes a todo", async () => {
  const taskName = "Hello, World!";

  render(<TodoList />);

  await userEvent.type(
    await screen.getByLabelText("Add a task"),
    `${taskName}{enter}`
  );

  expect(await screen.getByText(taskName)).toBeInTheDocument();
  expect(await screen.getByTestId("total-tasks-count")).toHaveTextContent(1);

  await userEvent.click(
    await screen.getByRole("button", {
      name: `Remove todo item: ${taskName}`,
    })
  );

  expect(screen.queryByText(taskName)).not.toBeInTheDocument();
  expect(await screen.getByTestId("total-tasks-count")).toHaveTextContent(0);
});

it("Adds 3 todos, and sorts by taskName", () => {
  const taskNames = ["Alpha", "Beta", "Gamma"];

  render(<TodoList />);

  taskNames.map((taskName) => {
    userEvent.type(screen.getByLabelText("Add a task"), `${taskName}{enter}`);
  });

  const sortByTask = screen.getByRole("button", { name: "Sort by task name" });

  userEvent.click(sortByTask);

  const taskListAsc = screen.queryAllByText(
    (text) => taskNames.indexOf(text) !== -1
  );
  expect(taskListAsc).toHaveLength(3);
  expect(taskListAsc[0]).toHaveTextContent(taskNames[2]);
  expect(taskListAsc[1]).toHaveTextContent(taskNames[1]);
  expect(taskListAsc[2]).toHaveTextContent(taskNames[0]);

  userEvent.click(sortByTask);

  const taskListDesc = screen.queryAllByText(
    (text) => taskNames.indexOf(text) !== -1
  );
  expect(taskListDesc).toHaveLength(3);
  expect(taskListDesc[0]).toHaveTextContent(taskNames[0]);
  expect(taskListDesc[1]).toHaveTextContent(taskNames[1]);
  expect(taskListDesc[2]).toHaveTextContent(taskNames[2]);
});

// More possible tests
// - sort by priority
// - mark completed
// - mark completed and hide
// - mark completed, hide and sort

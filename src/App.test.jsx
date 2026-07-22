// Tests for the routed to-do app. Run with: npm test
// App now uses router hooks, so each render is wrapped in a <MemoryRouter>.
import { test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App.jsx";

function renderApp(route = "/") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

test("renders the initial todos", () => {
  renderApp();
  expect(screen.getByText("Build the to-do list")).toBeTruthy();
  expect(screen.getByText("Add one of your own")).toBeTruthy();
});

test("shows a derived done count", () => {
  renderApp();
  expect(screen.getByText(/1 of 3 done/i)).toBeTruthy();
});

test("adds a todo from the form", async () => {
  renderApp();
  await userEvent.type(screen.getByPlaceholderText(/add a todo/i), "Walk the dog");
  await userEvent.click(screen.getByRole("button", { name: /^add$/i }));
  expect(screen.getByText("Walk the dog")).toBeTruthy();
});

test("toggles a todo's done state", async () => {
  renderApp();
  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes[1].checked).toBe(false);
  await userEvent.click(checkboxes[1]);
  expect(checkboxes[1].checked).toBe(true);
  expect(screen.getByText(/2 of 3 done/i)).toBeTruthy();
});

test("deletes a todo", async () => {
  renderApp();
  const item = screen.getByText("Build the to-do list").closest("li");
  await userEvent.click(within(item).getByRole("button", { name: /delete/i }));
  expect(screen.queryByText("Build the to-do list")).toBeNull();
});

test("the form clears after adding (controlled input)", async () => {
  renderApp();
  const input = screen.getByPlaceholderText(/add a todo/i);
  await userEvent.type(input, "Buy milk");
  await userEvent.click(screen.getByRole("button", { name: /^add$/i }));
  expect(input.value).toBe("");
});

// ----- Lab 09 additions: the filter is a route (URL), reached via links -----

test("clicking the Active filter link shows only not-done todos", async () => {
  renderApp();
  await userEvent.click(screen.getByRole("link", { name: /^active$/i }));
  expect(screen.queryByText("Read the lab README")).toBeNull(); // done -> hidden
  expect(screen.getByText("Build the to-do list")).toBeTruthy(); // active -> shown
});

test("deep-linking to /completed shows only done todos", () => {
  renderApp("/completed"); // arriving directly at the URL, no clicking
  expect(screen.getByText("Read the lab README")).toBeTruthy(); // done -> shown
  expect(screen.queryByText("Build the to-do list")).toBeNull(); // active -> hidden
});

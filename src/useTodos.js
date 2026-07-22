import { useState } from "react";

const INITIAL_TODOS = [
  { id: 1, text: "Read the lab README", done: true },
  { id: 2, text: "Build the to-do list", done: false },
  { id: 3, text: "Add one of your own", done: false },
];

// A custom hook is a `use*` function that calls hooks. Your job: move the todos
// STATE and the three operations out of your old App and into here, so App
// stays thin. That move is "extracting a hook".
//
// TODO: replace the placeholder below with the real hook —
//   const [todos, setTodos] = useState(INITIAL_TODOS)
//   addTodo(text)   → append { id, text, done: false } (immutably, like Lab 08)
//   toggleTodo(id)  → flip `done` on the matching todo
//   deleteTodo(id)  → drop the matching todo
//   return { todos, addTodo, toggleTodo, deleteTodo }
export function useTodos() {
  // Placeholder so the list renders — REPLACE it. Right now `todos` is a
  // static array and the actions do nothing; swap in useState + real updates.
  return {
    todos: INITIAL_TODOS,
    addTodo: () => {},
    toggleTodo: () => {},
    deleteTodo: () => {},
  };
}

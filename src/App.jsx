import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import { useTodos } from "./useTodos.js";
import AddTodoForm from "./AddTodoForm.jsx";
import TodoView from "./TodoView.jsx";

export default function App() {
  // All the list logic now lives in the hook — App stays thin.
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const doneCount = todos.filter((t) => t.done).length;

  return (
    <main className="app">
      <h1>My To-Dos</h1>
      <AddTodoForm onAdd={addTodo} />

      {/* the filters are now links to real URLs; NavLink marks the active one */}
      <nav className="filters">
        <NavLink to="/all">All</NavLink>
        <NavLink to="/active">Active</NavLink>
        <NavLink to="/completed">Completed</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/all" replace />} />
        <Route
          path="/:filter"
          element={
            <TodoView todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
          }
        />
      </Routes>

      <p className="count">{`${doneCount} of ${todos.length} done`}</p>
    </main>
  );
}

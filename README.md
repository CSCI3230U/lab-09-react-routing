# Lab 09 - React: state management & routing

The third React lab, building on your Lab 08 to-do app:

| Lab | You add | Topic |
|-----|---------|-------|
| 08 | a controlled form + filters | forms, derived state |
| 09 | a `useTodos` hook + routing | custom hooks, React Router |
| 11 | loading from a server | effects, fetching, async |

Two new concepts:

1. **A custom hook** - pull all the list logic out of `App` into a reusable `useTodos()` hook, so the components stay thin
2. **Client-side routing** - the filters become real URLs (`/all`, `/active`, `/completed`): bookmarkable, shareable, and the back button works - with no page reload

## Continue from your Lab 08 solution

Copy these three components in (they're unchanged): `src/TodoList.jsx`, `src/TodoItem.jsx`, `src/AddTodoForm.jsx`.

This starter provides the routing scaffold for you to fill in:

| File | State |
|------|-------|
| `src/main.jsx` | **done** - wraps the app in `<BrowserRouter>` |
| `src/App.jsx` | **done - read it** - the router shell: calls `useTodos()`, renders the `<NavLink>` filters and a `<Routes>` that sends `/:filter` to `TodoView` |
| `src/useTodos.js` | **you write** - the custom hook that owns the todos |
| `src/TodoView.jsx` | **you write** - reads the filter from the URL with `useParams` |
| `src/App.test.jsx` | the spec (8 tests) - don't edit |
| `package.json` | now includes `react-router-dom` |

```bash
npm install      # pulls react-router-dom too
npm run dev
npm test
```

## Requirements

1. **Implement `src/useTodos.js`** - extract the state from your Lab 08 `App` into a hook:

   ```js
   export function useTodos() {
     const [todos, setTodos] = useState(INITIAL_TODOS);
     // addTodo / toggleTodo / deleteTodo - the SAME immutable updates as Lab 08
     return { todos, addTodo, toggleTodo, deleteTodo };
   }
   ```

   A custom hook is just a `use*` function that calls hooks and returns an API. `App` already calls it - notice how thin `App` becomes once the hook owns the list.

2. **Implement `src/TodoView.jsx`** - the component the `/:filter` route renders. Read the filter from the URL, not from state:

   ```jsx
   const { filter } = useParams(); // "all" | "active" | "completed"
   // build `visible` from todos + filter, then render <TodoList todos={visible} … />
   ```

## How the routing works (it's in the given `App.jsx` - make sure you understand it)

- `main.jsx` wraps everything in `<BrowserRouter>` (routing needs a router at the top).
- The filters are **`<NavLink to="/active">`** etc. - like `<a>`, but they navigate client-side (no reload) and auto-get an `active` class for styling.
- `<Routes>` picks the matching `<Route>`: `/` redirects to `/all`; `/:filter` renders `<TodoView>`, and the `:filter` part is what `useParams` reads.

## The big ideas

- **Custom hooks** package stateful logic for reuse - and keep components focused on rendering (Each call site gets its own state. To share one list, you'd call the hook high up and pass it down, or use Context)
- **Client-side routing** makes the URL drive the view. Using real URLs means that bookmarks, deep links, and the back button all work

## The AI rules

- **You may use an AI agent to generate the code** above, but you must use free models only (for fairness)
- **Document every use** in `AI-USAGE.md` - the verbatim prompt, the files, and what you kept / changed / rejected. Add it before you commit that code, with a `// AI-assisted - see AI-USAGE.md #N` marker where it lives
- **Reflect:** what did the agent get wrong or do awkwardly? (in `AI-USAGE.md`)
- **Own every line.** You may be asked to explain any line the agent wrote. If you can't explain it, don't submit it

## Quality bar (this is graded)

- **All 8 tests pass** (`npm test`)
- **The list logic lives in `useTodos`** - `App` doesn't hold the todos array or the add/toggle/delete functions itself
- **The filter comes from the URL** (`useParams` in `TodoView`), not a `useState`

## How you're graded

- **Automated:** `npm test` - all 8 (including the routing tests: clicking a filter link, and deep-linking to `/completed`)
- **By rubric:** the hook genuinely owns the state, and the filter is route-driven
- **AI documentation:** complete `AI-USAGE.md` + reflection; and you can explain your code on request

## How to submit (GitHub Classroom)

Commit and push to `origin` (`.gitignore` keeps `node_modules/` out). The graded state is whatever is on `main`.

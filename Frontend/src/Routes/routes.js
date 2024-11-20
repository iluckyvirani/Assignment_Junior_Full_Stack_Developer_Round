/** @format */

import AllBooks from "../Pages/Books/AllBooks";
import Dashboard from "../Pages/Dashboard/Dashboard.js";
import Login from "../Pages/Login";

import Register from "../Pages/Register";
import UserProfile from "../Pages/UserProfile";

const routes = [
  { path: "/login", element: <Login /> },
  { path: "/", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/all-books", element: <AllBooks /> },
  { path: "/profile", element: <UserProfile /> },
];

export default routes;

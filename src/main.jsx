import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import UsersRepo from "./pages/UsersRepo/UsersRepo";
import SearchUser from "./pages/SearchUser/SearchUser";

const router = createBrowserRouter([
	{
		path: "/",
		element: <SearchUser />,
	},
	{
		path: "user",
		element: <UsersRepo />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

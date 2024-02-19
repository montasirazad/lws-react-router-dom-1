import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  createContactAction,
  deleteContactAction,
  editContactAction,
} from "./actions/contactsAction";
import EditContact from "./EditContact";
import ErrorPage from "./ErrorPage";
import Index from "./Index";
import "./index.css";
import {
  getContactLoader,
  getContactsLoader,
  updateContactFavorite,
} from "./loaders/contactsLoader";
import Contact from "./routes/Contact";
import Root from "./routes/roots";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: getContactsLoader,
    action: createContactAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: getContactLoader,
            action: updateContactFavorite,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: getContactLoader,
            action: editContactAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: deleteContactAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

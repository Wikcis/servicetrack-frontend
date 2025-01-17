import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {
    NotFoundPage,
    TechniciansListPage,
    ClientsListPage,
    ServiceOrdersPage, ProfilePage
} from "./pages";
import {ApiContextProvider} from "./context";

const router = createBrowserRouter([
    {
        path: "/",
        element: <TechniciansListPage/>,
        errorElement: <NotFoundPage/>
    },
    {
        path: "/technicians",
        element: <TechniciansListPage/>,
    },
    {
        path: "/clients",
        element: <ClientsListPage/>,
    },
    {
        path: "/serviceorders",
        element: <ServiceOrdersPage/>,
    },
    {
        path: "/profile",
        element: <ProfilePage/>,
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApiContextProvider>
        <RouterProvider router={router}/>
    </ApiContextProvider>
);
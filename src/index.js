import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {
    NotFoundPage,
    TechniciansListPage,
    ClientsListPage,
    ServiceOrdersPage
} from "./pages";

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
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
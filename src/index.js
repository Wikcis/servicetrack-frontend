import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {
    NotFoundPage,
    TechniciansListPage,
    ClientsListPage,
    ServiceOrdersPage, ProfilePage, LoginPage, RegistrationPage
} from "./pages";
import {ApiContextProvider, REST_API_URLS} from "./context";
import {ProtectedRoute} from "./components";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute element={<TechniciansListPage />} />
        ),
        errorElement: <NotFoundPage />,
    },
    {
        path: REST_API_URLS.ONLY_TECHNICIANS_URL,
        element: (
            <ProtectedRoute element={<TechniciansListPage />} />
        ),
    },
    {
        path: REST_API_URLS.ONLY_CLIENTS_URL,
        element: (
            <ProtectedRoute element={<ClientsListPage />} />
        ),
    },
    {
        path: REST_API_URLS.ONLY_SERVICEORDERS_URL,
        element: (
            <ProtectedRoute element={<ServiceOrdersPage />} />
        ),
    },
    {
        path: REST_API_URLS.ONLY_PROFILE_URL,
        element: (
            <ProtectedRoute element={<ProfilePage />} />
        ),
    },
    {
        path: REST_API_URLS.ONLY_LOGIN_URL,
        element: <LoginPage />,
    },
    {
        path: REST_API_URLS.ONLY_REGISTRATION_URL,
        element: <RegistrationPage />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApiContextProvider>
        <RouterProvider router={router}/>
    </ApiContextProvider>
);
import React, {createContext, useCallback, useState} from "react";
import {getMethod} from "../services";
import {Format, mapAccessorToHeader, Status, Type} from "../utils";
import {REST_API_URLS} from "../api/apiConstants";

export const AppContext = createContext();

export const ApiContextProvider = ({children}) => {

    const [dataFetched, setDataFetched] = useState(false);

    const [clients, setClients] = useState([]);
    const [serviceOrders, setServiceOrders] = useState([]);
    const [technicians, setTechnicians] = useState([]);

    const [filteredClients, setFilteredClients] = useState([]);
    const [filteredTechnicians, setFilteredTechnicians] = useState([]);
    const [filteredServiceOrders, setFilteredServiceOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchClients = useCallback(async () => {
        let clientsResponse = {data: {clients: []}};

        try {

            clientsResponse = await getMethod(REST_API_URLS.CLIENTS_URL);
            if (clientsResponse) {
                setClients(clientsResponse.clients);
                setFilteredClients(clientsResponse.clients);
            }
            return clientsResponse;
        } catch (err) {
            console.error("Error refreshing clients:", err);
        }

        return clientsResponse;
    }, []);

    const fetchTechnicians = useCallback(async () => {
        let techniciansResponse = {data: {technicians: []}};

        try {
            techniciansResponse = await getMethod(REST_API_URLS.TECHNICIANS_URL);

            if(techniciansResponse) {
                setTechnicians(techniciansResponse.technicians);
                setFilteredTechnicians(techniciansResponse.technicians);
            }
            return techniciansResponse;
        } catch (err) {
            console.error("Error refreshing technicians:", err);
        }

        return techniciansResponse;
    }, []);

    const fetchServiceOrders = useCallback(async () => {

        let ordersResponse = {data: {serviceOrders: []}};

        try {
            ordersResponse = await getMethod(REST_API_URLS.SERVICEORDERS_URL);

            if(ordersResponse) {
                setServiceOrders(ordersResponse.serviceOrders);
                setFilteredServiceOrders(ordersResponse.serviceOrders);

            }

            return ordersResponse;
        } catch (err) {
            console.error("Error refreshing service orders:", err);
        }

        return ordersResponse;
    }, []);

    const createClientsWithAdditionalData = useCallback((clientsToMap, serviceOrdersToMap) => {

        const mappedClients = clientsToMap.map(client => {

            const clientOrders = serviceOrdersToMap.filter(order => order.clientId === client.id);

            const distinctServiceFormats = Array.from(
                new Set(clientOrders.map(order => mapAccessorToHeader(order.serviceFormat, Format)))
            ).join(", ");


            return {
                ...client,
                numberOfServices: clientOrders.length,
                serviceFormats: distinctServiceFormats || "",
            };
        });

        setClients(mappedClients);
        setFilteredClients(mappedClients);

    }, []);

    const createTechniciansWithAdditionalData = useCallback((techniciansToMap, serviceOrdersToMap) => {

        const mappedTechnicians = techniciansToMap.map(technician => {
            const technicianOrders = serviceOrdersToMap.filter(order => order.technicianId === technician.id);

            return {
                ...technician,
                numberOfServices: technicianOrders.length,
            };
        });

        setTechnicians(mappedTechnicians);
        setFilteredTechnicians(mappedTechnicians);
    }, []);

    const createServiceOrdersWithAdditionalData = useCallback((filteredClientsToMap, serviceOrdersToMap) => {

        const clientsForOrder = Object.fromEntries(filteredClientsToMap.map(client => [client.id, client.name]));

        const mappedOrders = serviceOrdersToMap.map(order => ({
            ...order,
            serviceFormat: mapAccessorToHeader(order.serviceFormat, Format),
            status: mapAccessorToHeader(order.status, Status),
            serviceType: mapAccessorToHeader(order.serviceType, Type),
            clientName: clientsForOrder[order.clientId],
        }));

        setServiceOrders(mappedOrders)
        setFilteredServiceOrders(mappedOrders);
    }, []);

    const fetchData = async () => {
        if (dataFetched) return;

        setLoading(true);

        try {
            const clientsResponse = await fetchClients();
            const techniciansResponse = await fetchTechnicians();
            const serviceOrdersResponse = await fetchServiceOrders();

            if (clientsResponse && serviceOrdersResponse) {
                const updatedClients = createClientsWithAdditionalData(
                    clientsResponse.clients,
                    serviceOrdersResponse.serviceOrders
                );
                const updatedServiceOrders = createServiceOrdersWithAdditionalData(
                    clientsResponse.clients,
                    serviceOrdersResponse.serviceOrders
                );

                if (techniciansResponse && serviceOrdersResponse) {
                    const updatedTechnicians = createTechniciansWithAdditionalData(
                        techniciansResponse.technicians,
                        serviceOrdersResponse.serviceOrders
                    );
                    setTechnicians(updatedTechnicians);
                }

                setClients(updatedClients);
                setServiceOrders(updatedServiceOrders);
            }

            if (techniciansResponse && serviceOrdersResponse) {
                const updatedTechnicians = createTechniciansWithAdditionalData(
                    techniciansResponse.technicians,
                    serviceOrdersResponse.serviceOrders
                );
                setTechnicians(updatedTechnicians);
            }

            setDataFetched(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const refreshClients = useCallback(async () => {
        const clientsResponse = await fetchClients();

        createClientsWithAdditionalData(clientsResponse.clients, serviceOrders);
    }, [fetchClients]);

    const refreshTechnicians = useCallback(async () => {
        const techniciansResponse = await fetchTechnicians();

        createTechniciansWithAdditionalData(techniciansResponse.technicians, serviceOrders);
    }, [fetchTechnicians]);

    const refreshServiceOrders = useCallback(async () => {
        const clientsResponse = await fetchClients();
        const ordersResponse = await fetchServiceOrders();

        createServiceOrdersWithAdditionalData(clientsResponse.clients, ordersResponse.serviceOrders);

    }, [fetchServiceOrders]);

    const searchClients = useCallback((input) => {

        const search = input?.trim().toLowerCase() || "";

        if (search === "") {
            setFilteredClients(clients);
            return;
        }

        const filtered = clients.filter((client) => {
            return (
                client.name?.toLowerCase().includes(search) ||
                client.phoneNumber?.toString().includes(search) ||
                client.email?.toLowerCase().includes(search) ||
                client.serviceFormats?.toLowerCase().includes(search)
            );
        });

        setFilteredClients(filtered);
    }, [clients]);


    const searchTechnicians = useCallback((input) => {

        const search = input?.trim().toLowerCase() || "";

        if (search === "") {
            setFilteredTechnicians(technicians);
            return;
        }

        const filtered = technicians.filter((technician) => {
            return (
                technician.firstName?.toLowerCase().includes(search) ||
                technician.lastName?.toLowerCase().includes(search) ||
                technician.phoneNumber?.toString().includes(search) ||
                technician.email?.toLowerCase().includes(search)
            );
        });

        setFilteredTechnicians(filtered);
    }, [technicians]);

    const searchServiceOrders = useCallback((input) => {

        const search = input?.trim().toLowerCase() || "";

        if (search === "") {
            setFilteredServiceOrders(serviceOrders);
            return;
        }

        const filtered = serviceOrders.filter((serviceOrder) => {
            return (
                serviceOrder.clientName?.toLowerCase().includes(search) ||
                serviceOrder.serviceType?.toLowerCase().includes(search) ||
                serviceOrder.serviceFormat?.toLowerCase().includes(search) ||
                serviceOrder.dateTimeOfService?.toLowerCase().includes(search) ||
                serviceOrder.status?.toLowerCase().includes(search) ||
                serviceOrder.serviceDuration?.toLowerCase().includes(search)
            );
        });

        setFilteredServiceOrders(filtered);
    }, [serviceOrders]);

    return (
        <AppContext.Provider
            value={{
                clients,
                refreshClients,
                filteredClients,
                setFilteredClients,
                technicians,
                refreshTechnicians,
                filteredTechnicians,
                setFilteredTechnicians,
                serviceOrders,
                refreshServiceOrders,
                filteredServiceOrders,
                setFilteredServiceOrders,
                searchClients,
                searchTechnicians,
                searchServiceOrders,
                loading,
                fetchData
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
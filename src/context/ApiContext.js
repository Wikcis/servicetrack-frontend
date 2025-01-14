import React, {createContext, useCallback, useEffect, useState} from "react";
import {listClients, listServiceOrders, listTechnicians} from "../services";
import {Format, mapAccessorToHeader, Status, Type} from "../utils";

export const ApiContext = createContext();

export const ApiContextProvider = ({children}) => {

    const [clients, setClients] = useState([]);
    const [serviceOrders, setServiceOrders] = useState([]);
    const [technicians, setTechnicians] = useState([]);

    const [filteredClients, setFilteredClients] = useState([]);
    const [filteredTechnicians, setFilteredTechnicians] = useState([]);
    const [filteredServiceOrders, setFilteredServiceOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchClients = useCallback(async () => {
        let clientsResponse =  {data: {clients: []}};

        try {
            clientsResponse = await listClients();

            setClients(clientsResponse.data.clients);
            setFilteredClients(clientsResponse.data.clients);

        } catch (err) {
            console.error("Error refreshing clients:", err);
        }

        return clientsResponse;
    }, []);

    const fetchTechnicians = useCallback(async () => {
        let techniciansResponse =  {data: {technicians: []}};

        try {
            techniciansResponse = await listTechnicians();
            setTechnicians(techniciansResponse.data.technicians);
            setFilteredTechnicians(techniciansResponse.data.technicians);

            return techniciansResponse;
        } catch (err) {
            console.error("Error refreshing technicians:", err);
        }

        return techniciansResponse;
    }, []);

    const fetchServiceOrders = useCallback(async () => {

        let ordersResponse =  {data: {serviceOrders: []}};

        try {
            ordersResponse = await listServiceOrders();

            setServiceOrders(ordersResponse.data.serviceOrders);
            setFilteredServiceOrders(ordersResponse.data.serviceOrders);

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

    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);
            console.log(clients.length + " " + technicians.length + " " + serviceOrders.length + " ASdasdas")

            const clientsResponse = await fetchClients();
            const techniciansResponse = await fetchTechnicians();
            const serviceOrdersResponse = await fetchServiceOrders();

            createClientsWithAdditionalData(clientsResponse.data.clients, serviceOrdersResponse.data.serviceOrders);
            createTechniciansWithAdditionalData(techniciansResponse.data.technicians, serviceOrdersResponse.data.serviceOrders);
            createServiceOrdersWithAdditionalData(clientsResponse.data.clients, serviceOrdersResponse.data.serviceOrders);

            setLoading(false);
        };

        fetchData();
    }, []);

    const refreshClients = useCallback(async () => {
        const clientsResponse = await fetchClients();
        
        createClientsWithAdditionalData(clientsResponse.data.clients, serviceOrders);
    }, [fetchClients]);

    const refreshTechnicians = useCallback(async () => {
        const techniciansResponse = await fetchTechnicians();

        createTechniciansWithAdditionalData(techniciansResponse.data.technicians, serviceOrders);
    }, [fetchTechnicians]);

    const refreshServiceOrders = useCallback(async () => {
        const clientsResponse = await fetchClients();
        const ordersResponse = await fetchServiceOrders();

        createServiceOrdersWithAdditionalData(clientsResponse.data.clients, ordersResponse.data.serviceOrders);

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
        <ApiContext.Provider
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
                loading
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};
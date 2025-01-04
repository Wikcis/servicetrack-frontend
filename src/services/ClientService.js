import axios from "axios";
import {REST_API_URLS} from "../context";

export const listClients = () =>
    axios.get(REST_API_URLS.CLIENTS_URL);

export const deleteClient = (clientId) =>
    axios.delete(REST_API_URLS.CLIENTS_URL + "/" + clientId);

export const getClient = (clientId) =>
    axios.get(REST_API_URLS.CLIENTS_URL + "/" + clientId);

export const addClient = (requestBody) => {
    console.log(requestBody);
    axios.post(REST_API_URLS.CLIENTS_URL, requestBody,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error);
        })
}



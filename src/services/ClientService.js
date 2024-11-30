import axios from "axios";
import {REST_API_URLS} from "../context";

export const listClients = () =>
    axios.get(REST_API_URLS.CLIENTS_URL);

export const deleteClient = (clientId) =>
    axios.delete(REST_API_URLS.CLIENTS_URL+"/"+clientId);

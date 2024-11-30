import axios from "axios";
import {REST_API_URLS} from "../context";

export const listServiceOrders = () =>
    axios.get(REST_API_URLS.SERVICEORDERS_URL);

export const deleteServiceOrder = (serviceOrderId) =>
    axios.delete(REST_API_URLS.SERVICEORDERS_URL+"/"+serviceOrderId);

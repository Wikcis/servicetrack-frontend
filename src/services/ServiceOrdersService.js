import axios from "axios";
import {REST_API_URLS} from "../context";

export const listServiceOrders = () =>
    axios.get(REST_API_URLS.SERVICEORDERS_URL);

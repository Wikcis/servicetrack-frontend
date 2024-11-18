import axios from "axios";
import {REST_API_URLS} from "../context";

export const listTechnician = () =>
    axios.get(REST_API_URLS.TECHNICIANS_URL);

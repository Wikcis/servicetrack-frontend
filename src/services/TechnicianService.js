import axios from "axios";
import {REST_API_TECHNICIANS_URL} from "../context/ApiUrl";

export const listTechnician = () =>
    axios.get(REST_API_TECHNICIANS_URL);

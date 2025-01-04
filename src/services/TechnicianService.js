import axios from "axios";
import {REST_API_URLS} from "../context";

export const listTechnicians = () =>
    axios.get(REST_API_URLS.TECHNICIANS_URL);

export const deleteTechnician = (technicianId) =>
    axios.delete(REST_API_URLS.TECHNICIANS_URL+"/"+technicianId);

export const addTechnician = (requestBody) => {

    axios.post(REST_API_URLS.TECHNICIANS_URL, requestBody)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error);
        })
}
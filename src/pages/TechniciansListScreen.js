import {useEffect, useState} from "react";
import {listTechnician} from "../services/TechnicianService";


const TechniciansListScreen = () => {

    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        listTechnician()
            .then((response) => {
                setTechnicians(response.data.technicians);
            }).catch(error => {
            console.error(error);
        })

    }, []);

    return (
        <div className="container">

            <h2 className="text-center">List of Technicians</h2>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Technician Id</th>
                    <th>Technician First Name</th>
                    <th>Technician Last Name</th>
                    <th>Technician Email</th>
                    <th>Technician Phone number</th>
                </tr>
                </thead>
                <tbody>
                {
                    technicians.map(technician =>
                        <tr>
                            <td>{technician.id}</td>
                            <td>{technician.firstName}</td>
                            <td>{technician.lastName}</td>
                            <td>{technician.email}</td>
                            <td>{technician.phoneNumber}</td>
                        </tr>)
                }
                </tbody>
            </table>

        </div>
    )
}

export default TechniciansListScreen;
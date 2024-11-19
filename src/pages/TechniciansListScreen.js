import {Sidebar} from "../components/ui";
import {Searchbar, Table} from "../components/form"
import React, {useEffect, useState} from "react";
import {listTechnician} from "../services";

export const TechniciansListScreen = () => {
    const [technicians, setTechnicians] = useState([]);
    const [filteredTechnicians, setFilteredTechnicians] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        listTechnician()
            .then((response) => {
                const data = response.data.technicians || [];
                setTechnicians(data);
                setFilteredTechnicians(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Failed to fetch technicians. Please try again later.");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setFilteredTechnicians(
            technicians.filter((technician) => {
                const search = searchInput;
                return (
                    technician.firstName.toLowerCase().includes(search) ||
                    technician.lastName.toLowerCase().includes(search) ||
                    technician.phoneNumber.toString().includes(search) ||
                    technician.email.toLowerCase().includes(search)
                );
            })
        );
    }, [searchInput, technicians]);

    if (loading) {
        return (
            <div className="sidebarContainer">
                <Sidebar/>
                <div className="container col py-3">
                    <h2 className="text-center">Loading...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="sidebarContainer">
                <Sidebar/>
                <div className="container col py-3">
                    <h2 className="text-center text-danger">{error}</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="sidebarContainer">
            <Sidebar/>
            <div className="mainContainer">
                <Searchbar onSearch={(input) => setSearchInput(input)} />
                <Table data={filteredTechnicians} />
            </div>
        </div>

    );
};

import {
    ClientsIcon,
    PrimaryClientsIcon,
    PrimaryServiceOrdersIcon,
    PrimaryTechnicianIcon,
    ServiceOrdersIcon,
    TechnicianIcon
} from "../../assets"

export const SidebarData = [
    {
        title: "Technicians",
        icon: <TechnicianIcon />,
        primaryIcon: <PrimaryTechnicianIcon />,
        link: "/technicians"
    },
    {
        title: "Service Orders",
        icon: <ServiceOrdersIcon/>,
        primaryIcon: <PrimaryServiceOrdersIcon/>,
        link: "/serviceorders"
    },
    {
        title: "Clients",
        icon: <ClientsIcon/>,
        primaryIcon: <PrimaryClientsIcon/>,
        link: "/clients"
    }
];


import {Logo} from "../../assets";
import {SidebarData} from "./SidebarData";
import {useNavigate} from "react-router-dom";

export const Sidebar = () => {

    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className="logoContainer">
                <Logo/>
            </div>
            <ul className="sidebarList">
                {SidebarData.map((item, index) => {
                    return (
                        <li
                            className="row"
                            id={window.location.pathname === item.link ? "active" : ""}
                            key={index}
                            onClick={() => navigate(item.link)}
                        >
                            <div id="icon">{item.icon}</div>
                            <div id="title">{item.title}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};


import {Logo} from "../../../assets";
import { SidebarData } from "./SidebarData";

export const Sidebar = () => {
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
                            onClick={() => (window.location.pathname = item.link)}
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


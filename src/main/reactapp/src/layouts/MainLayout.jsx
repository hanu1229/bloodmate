import { Outlet } from "react-router-dom";
import "../styles/mainLayout.css";
import "../styles/app.css";
import Header from "./Header";
import SideBar from "./SideBar";

export default function MainLayout(props) {
    return (
        <>
            <div style={{display : "flex", flexDirection : "column", height : "100vh"}}>
                <Header/>
                <div className = "layouts">
                    <SideBar/>
                    <div className = "main-layout">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    );
}
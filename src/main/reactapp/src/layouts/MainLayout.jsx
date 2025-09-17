import { Outlet } from "react-router-dom";
import "../styles/mainLayout.css";
import "../styles/app.css";
import Header from "./Header";
import SideBar from "./SideBar";
import { Box } from "@mui/joy";
import { useState } from "react";

export default function MainLayout(props) {

    const [isScroll, setIsScroll] = useState(false);

    return (
        <>
            <div style={{display : "flex", flexDirection : "column", height : "100vh", minHeight : 0, overflow : "hidden"}}>
                <Header/>
                <div className = "layouts">
                    <SideBar/>
                    <Box className = "main-layout" sx = {{scrollBarGutter : isScroll ? "stable" : null}}>
                        <Outlet/>
                    </Box>
                </div>
            </div>
        </>
    );
}
import { Outlet } from "react-router-dom";
import "../styles/mainLayout.css";
import "../styles/app.css";
import Header from "./Header";
import SideBar from "./SideBar";
import { Box } from "@mui/joy";
import { useState } from "react";

export default function MainLayout(props) {

    const [isScroll, setIsScroll] = useState(false);
    const [loginState, setLoginState] = useState(!!localStorage.getItem("Token"));
    /// 리액트는 부모의 state가 변경되면 부모가 재랜더링되고 자식에게 보낸 props도 다시 계산된다.
    return (
        <>
            <div style={{display : "flex", flexDirection : "column", height : "100vh", minHeight : 0, overflow : "hidden"}}>
                <Header loginState = {loginState} setLoginState = {setLoginState} />
                <div className = "layouts">
                    <SideBar/>
                    <Box className = "main-layout" sx = {{scrollBarGutter : isScroll ? "stable" : null}}>
                        {/* context --> 원하는 값 또는 함수를 최하위 jsx파일에서까지 사용할 수 있도록 만듬 | 단, useOutletContext 필요 */}
                        <Outlet context = {{setLoginState}} />
                    </Box>
                </div>
            </div>
        </>
    );
}
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import Button from "@mui/joy/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/joy";
import { serverDomain } from "../ApiDomain";

export default function Header(props) {

    const navigate = useNavigate();
    const [loginState, setLoginState] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("Token");
        if(token != null) { setLoginState(true); } else { setLoginState(false); }
    }, [loginState]);

    /** 로그인 페이지로 이동 */
    const loginButtonClick = () => {
        navigate("/login");
    };

    /** 로그아웃 */
    const logoutButtonClick = async () => {
        const answer = confirm("로그아웃 하시겠습니까?");
        if(!answer) { return }
        const token = localStorage.getItem("Token");
        try {
            const response = await axios.post(
                `${serverDomain}/user/logout`, 
                null, 
                {
                    headers : {
                        Authorization : token, 
                        "Content-Type" : "application/json"
                    }
                }
            );
        } catch(e) {
            console.log(e);
        }
        alert("로그아웃 되었습니다.");
        localStorage.removeItem("Token");
        console.log("정상적으로 로그아웃됨");
        setLoginState(false);
        navigate("/");
    }

    /** 게시판 페이지로 이동 */
    const changeToMyInfoPage = () => {
        navigate("/myinfo");
    }

    return (
        <>
            <div className = "header-main">
                <ul>
                    <li>
                        <Link to = "/" style = {{display : "flex", alignItems : "center", textDecoration : "none", color : "inherit"}}>
                            <Box sx = {{display : "flex", alignItems : "center", marginRight : "12px"}}>
                                <img src = "/logo_white.png" style = {{width : "36px", height : "36px"}}></img>
                            </Box>
                            <b style = {{fontSize : "24px"}}>블러드메이트</b>
                        </Link>
                    </li>
                    <li>
                        <Button
                            sx = {{
                                marginRight : "8px",
                                fontSize : "16px",
                                backgroundColor : "#A097D4",
                                "&:hover" :  {
                                    fontSize : "16px",
                                    backgroundColor : "#FFFFFF",
                                    color : "#000000"
                                }
                            }}
                            onClick = {changeToMyInfoPage}
                        >
                            내정보
                        </Button>
                        <Button 
                            sx = {{
                                fontSize : "16px",
                                backgroundColor : "#A097D4", 
                                "&:hover" : {
                                    fontSize : "16px",
                                    backgroundColor : "#FFFFFF", 
                                    color : "#000000"
                                }}
                            } 
                            onClick={() => {loginState ? logoutButtonClick() : loginButtonClick()}}
                        >
                            {loginState ? "로그아웃" : "로그인"}
                        </Button>
                    </li>
                </ul>
            </div>
        </>
    );
}
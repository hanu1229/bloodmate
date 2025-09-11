import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import Button from "@mui/joy/Button";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Header(props) {

    const navigate = useNavigate();
    const [loginState, setLoginState] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("Token");
        if(token != null) { setLoginState(true); } else { setLoginState(false); }
    }, [loginState]);

    const loginButtonClick = () => {
        navigate("/login");
    };

    const logoutButtonClick = async () => {
        const answer = confirm("로그아웃 하시겠습니까?");
        if(!answer) { return }
        const token = localStorage.getItem("Token");
        try {
            const response = await axios.post(
                "http://raunriu.iptime.org:8080/api/user/logout", 
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
    }

    return (
        <>
            <div className = "header-main">
                <ul>
                    <li>
                        <Link to = "/" style = {{textDecoration : "none", color : "inherit"}}>
                            <b>블러드메이트</b>
                        </Link>
                    </li>
                    <li>
                        <Button 
                            sx = {
                                {
                                    backgroundColor : "#A097D4", 
                                    "&:hover" : {
                                        backgroundColor : "#FFFFFF", 
                                        color : "#000000"
                                    }
                                }
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
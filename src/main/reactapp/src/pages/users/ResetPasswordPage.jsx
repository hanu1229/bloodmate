import { Box, Button, IconButton, Input, Tooltip, Typography } from "@mui/joy";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { btnColor, inputFocusColor } from "../../styles/commonStyle";
import { useState } from "react";
import { Key, Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { serverDomain } from "../../ApiDomain";

export default function ResetPasswordPage(props) {

    const navigate = useNavigate();
    const {token} = useParams();
    const location = useLocation();
    const state = location.state;
    

    const [newPassword, setNewPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    /** 비밀번호 확인 체크 */
    const [lastCheck, setLastCheck] = useState(true);

    /** 비밀번호 확인 */
    const changePassword = (event) => {
        console.log(state);
        console.log(token);
        if(event.target.name === "newPassword") {
            setNewPassword(event.target.value);
            if(checkPassword === event.target.value) { setLastCheck(true); }
            else { setLastCheck(false); }
        }
        else if(event.target.name === "checkPassword") {
            setCheckPassword(event.target.value);
            if(newPassword === event.target.value) { setLastCheck(true); }
            else { setLastCheck(false); }
        }
        return;
    }

    /** 비밀번호 변경 */
    const resetBtnClick = async () => {
        try {
            const response = await axios.post(`${serverDomain}/user/reset-password/${token}`, {...state, newPassword : newPassword}, {withCredentials : true});
            if(response.status == 201) {
                if(response.data) {
                    alert("비밀번호 변경 완료");
                    navigate("/login");
                } else {
                    const result = confirm("기존 비밀번호와 동일합니다.");
                    if(result) { navigate("/login"); }
                }
            }
        } catch(e) {
            console.log(e);
            alert(`status : ${e.response.status}\ndata : ${e.response.data}`);
        }
        

    }

    return (
        <>
            <div style = {{width : "100%", height : "100vh", display : "flex", justifyContent : "center", alignItems : "center"}}>
                <Box 
                    sx = {{
                        display : "flex", 
                        flexDirection : "column", 
                        padding : "20px",
                        width : 400,
                        textAlign : "center",
                        border : "2px solid #A097D4",
                        borderRadius : 16
                    }}>
                    <Typography sx = {{margin : "0px", fontSize : 32, color : "#A097D4"}}> {/* textShadow : "4px 4px 12px #A097D4" */}
                        <Tooltip title = "메인페이지로..." placement = "bottom" sx = {{backgroundColor : "#A097D4"}}>
                            <Link to = "/" style = {{textDecoration : "none", color : "inherit"}}>
                                블러드메이트
                            </Link>
                        </Tooltip>
                    </Typography>
                    <Typography sx = {{margin : "4px 0px", fontSize : 16, fontWeight : "bold"}}>비밀번호 재설정</Typography>
                    <Box sx = {{display : "flex", flexDirection : "column", padding : "28px 28px 0px 28px"}}>
                        {/* 비밀번호 */}
                        <Input 
                            name = "newPassword" type = {show1 ? "text" : "password"} placeholder = "새로운 비밀번호" 
                            value = {newPassword} onChange = {changePassword} 
                            startDecorator = {<Key/>} endDecorator = {<IconButton onClick = {() => {setShow1(!show1)}} sx = {{color : "#A097D4"}}>{show1 ? <VisibilityOff/> : <Visibility/>}</IconButton>}
                            sx = {{...inputFocusColor, marginBottom : "20px"}} 
                        />
                        
                        {/* 비밀번호 확인 */}
                        <Input 
                            name = "checkPassword" type = {show2 ? "text" : "password"} placeholder = "새로운 비밀번호 확인" 
                            value = {checkPassword} onChange = {changePassword} 
                            startDecorator = {<Key/>}  endDecorator = {<IconButton onClick = {() => {setShow2(!show2)}} sx = {{color : "#A097D4"}}>{show2 ? <VisibilityOff/> : <Visibility/>}</IconButton>}
                            sx = {{
                                    marginBottom : "20px", backgroundColor : "#FFFFFF", 
                                    borderColor : lastCheck ? "#A097D4" : "red", 
                                    "&:focus-within::before" : {
                                        boxShadow : lastCheck ? "inset 0 0 0 2px #A097D4" : "inset 0 0 0 2px red"
                                        }
                                }} 
                        />
                        
                        {/* 회원가입 버튼 */}
                        <Box>
                            <Button onClick = {resetBtnClick} sx = {{width : "100%", ...btnColor}}>비밀번호 변경</Button>
                        </Box>
                    </Box>
                </Box>
            </div>
        </>
    );
}
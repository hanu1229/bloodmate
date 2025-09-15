import { Box, Button, Input, Tooltip, Typography } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";
import { btnColor, inputFocusColor } from "../../styles/commonStyle";
import axios from "axios";
import { serverDomain } from "../../ApiDomain";
import { useState } from "react";

export default function IdSearchPage(props) {

    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [code, setCode] = useState("");

    /** 인증번호 발송 */
    const receiveCodeNumber = async () => {
        alert("인증번호 발송");
        try {
            const response = await axios.post(`${serverDomain}/user/verification-code`, {userName : userName, userPhone : userPhone}, {withCredentials : true});
            if(response.status == 201) {
                setCode(response.data);
                alert(`인증번호 : ${response.data}`);
                return;
            } 
        } catch(e) {
            console.log(e);
            alert(`${e.response.data}`);
        }
    }

    /** 인증번호 확인 */
    const checkCodeNumber = async () => {
        alert("인증번호 확인");
        try {
            const response = await axios.post(`${serverDomain}/user/check-code`, {userName : userName, userPhone : userPhone, verificationCode : code}, {withCredentials : true});
            if(response.status == 200) {
                alert("인증번호 정상 확인");
                return;
            }
        } catch(e) {
            console.log(e);
            alert(`status : ${e.response.status} / data : ${e.response.data}`);
        }
    }

    /** 아이디 찾기 */
    const searchId = async () => {
        alert("아이디 찾기");
        try {
            const response = await axios.post(`${serverDomain}/user/search`, {userName : userName, userPhone : userPhone, verificationCode : code}, {withCredentials : true});
            if(response.status == 201) {
                alert(`아이디 : ${response.data}`);
                navigate("/login");
                return;
            }
        } catch(e) {
            console.log(e);
            alert(`status : ${e.response.status}\n${e.response.data}`);
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
                        borderRadius : 15
                    }}>
                    <Typography sx = {{margin : "0px", fontSize : 32, color : "#A097D4"}}> {/* textShadow : "5px 5px 10px #A097D4" */}
                        <Tooltip title = "메인페이지로..." placement = "top" sx = {{backgroundColor : "#A097D4"}}>
                            <Link to = "/" style = {{textDecoration : "none", color : "inherit"}}>
                                블러드메이트
                            </Link>
                        </Tooltip>
                    </Typography>
                    <Typography sx = {{margin : "5px 0px", fontSize : 28, color : "#A097D4"}}>아이디 찾기</Typography>
                    <Box sx = {{display : "flex", flexDirection : "column", padding : "30px 30px 0px 30px"}}>
                        {/* 이름 */}
                        <Input type = "text" value = {userName} onChange = {(event) => { setUserName(event.target.value); }} placeholder = "이름..." sx = {{marginBottom : "20px", ...inputFocusColor}}/>
                        {/* 전화번호 */}
                        <Box sx = {{display : "flex", justifyContent : "space-between", marginBottom : "20px"}}>
                            <Input type = "text" value = {userPhone} onChange = {(event) => { setUserPhone(event.target.value); }} placeholder = "전화번호(010-XXXX-XXXX)" sx = {{flex : 1, marginRight : "20px", ...inputFocusColor}}/>
                            <Button onClick = {receiveCodeNumber} sx = {{...btnColor}}>인증번호 발송</Button>
                        </Box>
                        {/* 인증번호 */}
                        <Box sx = {{display : "flex", justifyContent : "space-between", marginBottom : "20px"}}>
                            <Input type = "text" value = {code} onChange = {(event) => { setCode(event.target.value); }} placeholder = "인증번호..." sx = {{flex : 1, marginRight : "20px", ...inputFocusColor}} />
                            <Button onClick = {checkCodeNumber} sx = {{...btnColor}}>확인</Button>
                        </Box>
                        <Button onClick = {searchId} sx = {{marginBottom : "20px", ...btnColor}}>아이디 찾기</Button>
                        <Typography>
                            <Box sx = {{display : "flex", justifyContent : "space-evenly"}}>
                                <Link to = "/login" style = {{textDecoration : "none", color : "#424242"}}>
                                    <Typography>로그인으로</Typography>
                                </Link>
                                <Link to = "/search/password" style = {{textDecoration : "none", color : "#424242"}}>
                                    <Typography>비밀번호 찾기</Typography>
                                </Link>
                            </Box>
                        </Typography>
                    </Box>
                </Box>
            </div>
        </>
    );
}
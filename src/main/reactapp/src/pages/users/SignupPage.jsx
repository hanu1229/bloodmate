import { Box, Button, Input, Option, Select, Tooltip, Typography } from "@mui/joy";
import { CalendarMonthOutlined, EmailOutlined, Key, PersonOutline, SmartphoneOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { btnColor, inputFocusColor } from "../../styles/commonStyle";

import "../../styles/signupPage.css";
import {serverDomain} from "../../ApiDomain";
import axios from "axios";

export default function SignupPage(props) {

    const navigate = useNavigate();

    /** 회원 정보 저장 */
    const [info, setInfo] = useState({
        userLoginId : "", userPassword : "", 
        userNickname : "", userName : "", 
        userBirthDate : "", userPhone : "", 
        userEmail : "", userRole : 0
    });
    /** 비밀번호 확인 */
    const [checkPassword, setCheckPassword] = useState("");
    /** 비밀번호 확인 체크 */
    const [lastCheck, setLastCheck] = useState(true);
    /** 체크 항목 관리 */
    const [checkInfo, setCheckInfo] = useState({userLoginId : false, userNickname : false, userPhone : false});


    const changeInfo = (event) => {
        setInfo({...info, [event.target.name] : event.target.value});
    }

    /** 비밀번호 확인 */
    const changePassword = (event) => {
        if(event.target.name === "userPassword") {
            setInfo({...info, [event.target.name] : event.target.value});
            if(checkPassword === event.target.value) { setLastCheck(true); }
            else { setLastCheck(false); }
        }
        else if(event.target.name === "password") {
            setCheckPassword(event.target.value);
            if(info.userPassword === event.target.value) { setLastCheck(true); }
            else { setLastCheck(false); }
        }
        return;
    }

    /** 아이디 확인 */
    const checkUserLoginId = async () => {
        const response = await axios.get(`${serverDomain}/user/check-login-id?userLoginId=${info.userLoginId}`);
        if(response.data) {
            alert("이미 존재하는 아이디입니다.");
            setCheckInfo({...checkInfo, userLoginId : false});
            return;
        }
        alert("가입 가능한 아이디입니다.");
        setCheckInfo({...checkInfo, userLoginId : true});
        return;
    }

    /** 닉네임 확인 */
    const checkUserNickname = async () => {
        const response = await axios.get(`${serverDomain}/user/check-nickname?userNickname=${info.userNickname}`);
        if(response.data) {
            alert("이미 존재하는 닉네임입니다.");
            setCheckInfo({...checkInfo, userNickname : false});
            return;
        }
        alert("가입 가능한 닉네임입니다.");
        setCheckInfo({...checkInfo, userNickname : true});
        return;
    }

    /** 전화번호 확인 */
    const checkUserPhone = async () => {
        const response = await axios.get(`${serverDomain}/user/check-phone?userPhone=${info.userPhone}`);
        if(response.data) {
            alert("이미 가입된 전화번호입니다.");
            setCheckInfo({...checkInfo, userPhone : false});
            return;
        }
        alert("가입 가능한 전화번호입니다.")
        setCheckInfo({...checkInfo, userPhone : true});
        return;
    }


    /** 회원가입 */
    const signupBtnClick = async () => {
        if(checkInfo.userLoginId && checkInfo.userNickname && checkInfo.userPhone) {
            try {
            const response = await axios.post(`${serverDomain}/user/signup`, info);
            console.log(`response.data : ${response.data} / response.status : ${response.status}`);
            if(response.status === 201 && response.data) {
                alert("회원가입이 완료되었습니다.");
                navigate("/login");
            }
            return;
            } catch(e) {
                alert("회원가입에 실패하셨습니다.");
                return;
            }
        } else if(!checkInfo.userLoginId) {
            alert("아이디를 확인해주세요");
        } else if(!checkInfo.userNickname) {
            alert("닉네임을 확인해주세요");
        } else if(!checkInfo.userPhone) {
            alert("전화번호를 확인해주세요");
        }
        return;
    }

    return (
        <>
            
            <div style = {{width : "100%", height : "100vh", display : "flex", justifyContent :  "center", alignItems : "center"}}>
                <Box
                    sx = {{
                        display : "flex",
                        flexDirection : "column",
                        textAlign : "center",
                        padding : "20px",
                        width : 400,
                        border : "2px solid #A097D4",
                        borderRadius : 16
                    }}
                >   
                    <Typography style= {{margin : "0px", textAlign : "center", fontSize : 32, color : "#A097D4"}}>
                        <Tooltip title = "메인페이지로..." placement = "top" sx = {{backgroundColor : "#A097D4"}}>
                            <Link to = "/" style = {{textDecoration : "none", color : "inherit"}}>
                                블러드메이트
                            </Link>
                        </Tooltip>
                    </Typography>
                    <Box sx = {{display : "flex", flexDirection : "column", padding : "28px 28px 0px 28px"}}>
                        {/* 이름 */}
                        <Input className = "input-style" name = "userName" type = "text" placeholder = "이름" value = {info.userName} onChange = {changeInfo} startDecorator = {<PersonOutline/>} sx = {{...inputFocusColor}} />
                        
                        {/* 생년월일 */}
                        <Input className = "input-style" name = "userBirthDate" type = "text" placeholder = "생년월일(XXXX-XX-XX)" value = {info.userBirthDate} onChange = {changeInfo} startDecorator = {<CalendarMonthOutlined/>} sx = {{...inputFocusColor}} />
                        
                        {/* 이메일 */}
                        <Input className = "input-style" name = "userEmail" type = "text" placeholder = "이메일" value = {info.userEmail} onChange = {changeInfo} startDecorator = {<EmailOutlined/>} sx = {{...inputFocusColor}} />
                        
                        {/* 전화번호 */}
                        <Box sx = {{display : "flex", justifyContent : "space-between"}}>
                            <Input className = "input-style" name = "userPhone" type = "text" placeholder = "전화번호(010-XXXX-XXXX)" value = {info.userPhone} onChange = {changeInfo} startDecorator = {<SmartphoneOutlined/>} sx = {{flex : 1, marginRight : "20px", ...inputFocusColor}} />
                            <Button sx={{marginBottom : "20px", ...btnColor}} onClick = {checkUserPhone}>확인</Button>
                        </Box>
                        
                        {/* 닉네임 */}
                        <Box sx = {{display : "flex", justifyContent : "space-between"}}>
                            <Input className = "input-style" name = "userNickname" type = "text" placeholder = "닉네임" value = {info.userNickname} onChange = {changeInfo} startDecorator = {<PersonOutline/>} sx = {{flex : 1, marginRight : "20px", ...inputFocusColor}} />
                            <Button sx={{marginBottom : "20px", ...btnColor}} onClick = {checkUserNickname}>확인</Button>
                        </Box>
                        
                        {/* 아이디 */}
                        <Box sx = {{display : "flex", justifyContent : "space-between"}}>
                            <Input className = "input-style" name = "userLoginId" type = "text" placeholder = "아이디" value = {info.userLoginId} onChange = {changeInfo} startDecorator = {<PersonOutline/>} sx = {{flex : 1, marginRight : "20px", ...inputFocusColor}} />
                            <Button sx={{marginBottom : "20px", ...btnColor}} onClick = {checkUserLoginId}>확인</Button>
                        </Box>
                        
                        {/* 비밀번호 */}
                        <Input className = "input-style" name = "userPassword" type = "password" placeholder = "비밀번호" value = {info.userPassword} onChange = {changePassword} startDecorator = {<Key/>} sx = {{...inputFocusColor}} />
                        
                        {/* 비밀번호 확인 */}
                        <Input className = "input-style" name = "password" type = "password" placeholder = "비밀번호 확인" value = {checkPassword} onChange = {changePassword} startDecorator = {<Key/>} sx = {{backgroundColor : "#FFFFFF", borderColor : lastCheck ? "#A097D4" : "red", "&:focus-within::before" : {boxShadow : lastCheck ? "inset 0 0 0 2px #A097D4" : "inset 0 0 0 2px red"}}}></Input>
                        
                        {/* 회원가입 버튼 */}
                        <Box>
                            <Button sx = {{width : "100%", ...btnColor}} onClick = {signupBtnClick}>회원가입</Button>
                        </Box>
                    </Box>
                </Box>
            </div>
        </>
    );
}

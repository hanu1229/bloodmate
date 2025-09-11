import { Box, Button, Input, Option, Select, Typography } from "@mui/joy";

import "../styles/signupPage.css";
import { EmailOutlined, HomeOutlined, Key, PersonOutline, SmartphoneOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage(props) {

    const navigate = useNavigate();

    /// 회원 정보 저장
    const [info, setInfo] = useState({
        userLoginId : "", userPassword : "", 
        userNickname : "", userName : "", 
        userAddress : "", userPhone : "", 
        userEmail : "", userRole : 0
    });
    /// 비밀번호 확인용
    const [checkPassword, setCheckPassword] = useState("");
    /// 이메일 조합용



    const changeInfo = (event) => {
        setInfo({...info, [event.target.name] : event.target.value});
    }
    const changePassword = (event) => {
        setCheckPassword(event.target.value);
    }

    const signupBtnClick = async () => {
        alert(
            `
            이름 : ${info.userName}
            닉네임 : ${info.userNickname}
            아이디 : ${info.userLoginId}
            비밀번호 : ${info.userPassword}
            비밀번호 확인 : ${checkPassword}
            이메일 : ${info.userEmail}
            전화번호 : ${info.userPhone}
            주소 : ${info.userAddress}
            `
        );
    }

    return (
        <>
            
            <div style = {{width : "100%", height : "100vh", display : "flex", justifyContent :  "center", alignItems : "center"}}>
                <Box
                    sx = {{
                        display : "flex",
                        flexDirection : "column",
                        textAlign : "center",
                        padding : "15px",
                        width : 400,
                        border : "2px solid #A097D4"
                    }}
                >
                    <Typography style= {{margin : "0px", textAlign : "center", fontSize : 32, color : "#A097D4", textShadow : "5px 5px 10px #A097D4"}}>블러드메이트</Typography>
                    <Box sx = {{display : "flex", flexDirection : "column", padding : "30px"}}>
                        <Input className = "input-style" name = "userName" type = "text" placeholder = "이름" value = {info.userName} onChange = {changeInfo} startDecorator = {<PersonOutline/>}></Input>
                        <Box sx = {{display : "flex", justifyContent : "space-between"}}>
                            <Input className = "input-style" name = "userNickname" type = "text" placeholder = "닉네임" value = {info.userNickname} onChange = {changeInfo} startDecorator = {<PersonOutline/>} sx = {{flex : 1, marginRight : "20px"}}></Input>
                            <Button sx={{marginBottom : "20px", backgroundColor : "#A097D4", color : "#FFFFFF", "&:hover" : {backgroundColor : "#A097D4", color : "#FFFFFF"}}}>확인</Button>
                        </Box>
                        <Box sx = {{display : "flex", justifyContent : "space-between"}}>
                            <Input className = "input-style" name = "userLoginId" type = "text" placeholder = "아이디" value = {info.userLoginId} onChange = {changeInfo} startDecorator = {<PersonOutline/>} sx = {{flex : 1, marginRight : "20px"}}></Input>
                            <Button sx={{marginBottom : "20px", backgroundColor : "#A097D4", color : "#FFFFFF", "&:hover" : {backgroundColor : "#A097D4", color : "#FFFFFF"}}}>확인</Button>
                        </Box>
                        <Input className = "input-style" name = "userPassword" type = "password" placeholder = "비밀번호" value = {info.userPassword} onChange = {changeInfo} startDecorator = {<Key/>}></Input>
                        <Input className = "input-style" name = "password" type = "password" placeholder = "비밀번호 확인" value = {checkPassword} onChange = {changePassword} startDecorator = {<Key/>}></Input>
                    
                        <Box sx = {{display : "flex", justifyContent : "space-between"}}>
                            <Input className = "input-style" name = "userEmail" type = "email" placeholder = "이메일" value = {info.userEmail} onChange = {changeInfo} startDecorator = {<EmailOutlined/>} sx = {{flex : 1, marginRight : "20px"}}></Input>
                            <Input className = "input-style"></Input>
                            <Select placeholder = "직접입력"  sx = {{marginBottom : "20px", width : "140px"}}>
                                <Option value = "직접입력">직접입력</Option>
                                <Option value = "naver.com">naver.com</Option>
                                <Option value = "daum.net">daum.net</Option>
                                <Option value = "google.com">google.com</Option>
                            </Select>
                        </Box>

                        <Box sx = {{display : "flex", justifyContent : "space-between"}}>
                            <Input className = "input-style" name = "userPhone" type = "text" placeholder = "전화번호(010-XXXX-XXXX)" value = {info.userPhone} onChange = {changeInfo} startDecorator = {<SmartphoneOutlined/>} sx = {{flex : 1, marginRight : "20px"}}></Input>
                            <Button sx={{marginBottom : "20px", backgroundColor : "#A097D4", color : "#FFFFFF", "&:hover" : {backgroundColor : "#A097D4", color : "#FFFFFF"}}}>확인</Button>
                        </Box>
                        <Input className = "input-style" name = "userAddress" type = "text" placeholder = "주소" value = {info.userAddress} onChange = {changeInfo} startDecorator = {<HomeOutlined/>}></Input>
                        <Box>
                            <Button 
                                sx = {{
                                    width : "100%",
                                    backgroundColor : "#A097D4",
                                    color : "#FFFFFF",
                                    "&:hover" : { backgroundColor : "#A097D4", color : "#FFFFFF" }
                                }}
                                onClick = {signupBtnClick}
                            >
                                회원가입
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </div>
        </>
    );
}

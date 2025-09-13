import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, Input, Typography } from "@mui/joy";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage(props) {

    const navigate = useNavigate();
    const [info, setInfo] = useState({userLoginId : "", userPassword : ""});
    const [show, setShow] = useState(false);

    const changeInfo = (event) => {
        setInfo({...info, [event.target.name] : event.target.value});
        console.log(info);
    }

    const loginBtnClick = async () => {
        // alert(`아이디 : ${info["userLoginId"]}\n비밀번호 : ${info.userPassword}`);
        try {
            const response = await axios.post("http://raunriu.iptime.org:8080/api/user/login", info);
            if(response.status == 200) {
                console.log(response.data);
                localStorage.setItem("Token", response.data);
                navigate("/");
            } else {
                alert(response.data);
            }
        } catch(e) {
            console.log(e);
        }
    }

    return(
        <>
            <div style={{width : "100%", height : "100vh", display : "flex", justifyContent : "center", alignItems : "center"}}>
                <Box sx = {{
                    display : "flex",
                    flexDirection : "column",
                    // border : "1px solid #A097D4",
                    borderRadius : 15,
                    padding : "15px",
                    height : 400,
                    width : 400,
                    textAlign : "center",
                    // backgroundColor : "#A097D4",
                    color : "#FFFFFF"
                }}>
                    <Typography sx = {{margin : "0px", fontSize : 32, color : "#A097D4", textShadow : "5px 5px 10px #A097D4"}}>
                        <Link to = "/" style = {{textDecoration : "none", color : "inherit"}}>블러드 메이트</Link>
                    </Typography>
                    <Box sx = {{display : "flex", flexDirection : "column", padding : "30px"}}>
                        <Input 
                            type = "text"
                            name = "userLoginId"
                            placeholder = "아이디..." 
                            variant = "outlined"
                            value = {info.userLoginId}
                            onChange = {changeInfo}
                            sx= {{
                                marginBottom : "30px", backgroundColor : "#FFFFFF", borderColor : "#A097D4", 
                                boxShadow : "2px 2px 10px #A097D4"
                            }}
                        />
                        <Input 
                            type = {show ? "text" : "password"}
                            name = "userPassword"
                            placeholder = "비밀번호..." 
                            variant = "outlined" 
                            value = {info.userPassword}
                            onChange = {changeInfo}
                            endDecorator = {
                                <IconButton 
                                    onClick={() => {setShow(value => !value)}}
                                    sx = {{color : "#A097D4"}}
                                >
                                    {show ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            }
                            sx= {{
                                marginBottom : "30px", backgroundColor : "#FFFFFF", borderColor : "#A097D4", 
                                boxShadow : "2px 2px 10px #A097D4"
                            }}
                        />
                        <Button 
                            sx = {{
                                marginBottom : "5px",
                                backgroundColor : "#A097D4", 
                                color : "#FFFFFF",
                                boxShadow : "2px 2px 10px #A097D4",
                                "&:hover" : {backgroundColor : "#A097D4", color : "#FFFFFF"}
                            }}
                            onClick = {loginBtnClick}
                        >
                            로그인
                        </Button> {/*  #424242  #6A1B9A */}
                        <Box sx = {{textAlign : "right"}}>
                            <Link to = "/search/id" style = {{textDecoration : "none", color : "#424242", fontSize : 12}}>아이디 찾기</Link>
                            <Box sx = {{display : "inline-block", width : "20px"}}/>
                            <Link to = "/search/password" style = {{textDecoration : "none", color : "#424242", fontSize : 12}}>비밀번호 찾기</Link>
                            <Box sx = {{display : "inline-block", width : "20px"}}/>
                            <Link to = "/signup" style = {{textDecoration : "none", color : "#424242", fontSize : 12}}>회원가입</Link>
                        </Box>
                    </Box>
                </Box>
            </div>
        </>
    );
}
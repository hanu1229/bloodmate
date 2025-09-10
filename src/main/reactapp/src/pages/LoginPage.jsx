import { Box, Button, Input, Typography } from "@mui/joy";
import { Link } from "react-router-dom";

export default function LoginPage(props) {

    const loginBtnClick = () => {
        alert("로그인하기!!!");
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
                    <Typography style= {{margin : "0px", fontSize : 32, color : "#A097D4", textShadow : "5px 5px 10px #A097D4"}}>블러드 메이트</Typography>
                    <Box sx = {{display : "flex", flexDirection : "column", padding : "30px"}}>
                        <Input placeholder = "아이디..." variant = "outlined" sx= {{marginBottom : "30px", backgroundColor : "#FFFFFF", borderColor : "#A097D4", boxShadow : "2px 2px 10px #A097D4"}}/>
                        <Input placeholder = "비밀번호..." variant = "outlined" sx= {{marginBottom : "30px", backgroundColor : "#FFFFFF", borderColor : "#A097D4", boxShadow : "2px 2px 10px #A097D4"}}/>
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
                        {/* <Button
                            sx = {{
                                marginTop : "10px",
                                backgroundColor : "#424242",
                                color : "#FFFFFF"
                            }}
                        >
                            회원가입
                        </Button> */}
                    </Box>
                </Box>
            </div>
        </>
    );
}
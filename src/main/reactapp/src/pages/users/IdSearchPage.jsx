import { Box, Button, Input, Tooltip, Typography } from "@mui/joy";
import { Link } from "react-router-dom";

export default function IdSearchPage(props) {
    return (
        <>  
            <div style = {{width : "100%", height : "100vh", display : "flex", justifyContent : "center", alignItems : "center"}}>
                <Box 
                    sx = {{
                        display : "flex", 
                        flexDirection : "column", 
                        // justifyContent : "center",
                        // alignItems : "center", 
                        width : 400, 
                        height : 400,
                        textAlign : "center",
                        border : "2px solid #A097D4",
                        borderRadius : 15
                    }}>
                    <Typography sx = {{margin : "0px", fontSize : 32, color : "#A097D4", textShadow : "5px 5px 10px #A097D4"}}>
                        <Tooltip title = "메인페이지로..." placement = "top" sx = {{backgroundColor : "#A097D4"}}>
                            <Link to = "/" style = {{textDecoration : "none", color : "inherit"}}>
                                블러드메이트
                            </Link>
                        </Tooltip>
                    </Typography>
                    <Box sx = {{display : "flex", flexDirection : "column", padding : "30px"}}>
                        {/* 이름 */}
                        <Input placeholder = "이름..." sx = {{marginBottom : "20px"}}/>
                        {/* 전화번호 */}
                        <Box sx = {{display : "flex", justifyContent : "space-between"}}>
                            <Input placeholder = "전화번호..." sx = {{flex : 1, marginRight : "20px"}}/>
                            <Button sx = {{backgroundColor : "#A097D4", color : "#FFFFFF", "&:hover": {backgroundColor : "#A097D4", color : "#FFFFFF"}}}>인증번호 발송</Button>
                        </Box>
                    </Box>
                </Box>
            </div>
        </>
    );
}
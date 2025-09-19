import { Box, Button, Input, Typography } from "@mui/joy";
import { btnColor, inputFocusColor } from "../../styles/commonStyle";
import { Email, Key } from "@mui/icons-material";

export default function EmailModal(props) {
    return (
        <Box sx = {{padding : "12px", display : "flex", flexDirection : "column", flex : 1, height : "100%"}}>
            <Box sx = {{marginBottom : "12px"}}>
                <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>현재 이메일</Typography>
                <Input placeholder = "현재 이메일" startDecorator = {<Email sx = {{color : "#A097D4"}} />} sx = {{...inputFocusColor}} />
            </Box>
            <Box sx = {{marginBottom : "12px"}}>
                <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>변경할 이메일</Typography>
                <Input placeholder = "변경할 이메일" startDecorator = {<Email sx = {{color : "#A097D4"}} />} sx = {{...inputFocusColor}} />
            </Box>
            <Box sx = {{marginBottom : "12px"}}>
                <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>비밀번호</Typography>
                <Input placeholder = "비밀번호" startDecorator = {<Key sx = {{color : "#A097D4"}} />} sx = {{...inputFocusColor}} />
            </Box>
            <Button sx = {{...btnColor, marginTop : "12px"}}>변경하기</Button>
        </Box>
    );
}
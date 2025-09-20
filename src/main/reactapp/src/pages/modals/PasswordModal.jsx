import { Box, Button, IconButton, Input, Typography } from "@mui/joy";
import { btnColor, iconColor, inputErrorColor, inputFocusColor } from "../../styles/commonStyle";
import { Key, Smartphone, SmartphoneOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { serverDomain } from "../../ApiDomain";

export default function PasswordModal(props) {

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [check, setCheck] = useState(true);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    
    // console.log(props.email);

    const checkPassword = (event) => {
        if(event.target.name === "password") {
            setPassword(event.target.value);
            if(newPassword === event.target.value) { setCheck(true); }
            else { setCheck(false); }
        }
        else if(event.target.name === "newPassword") {
            setNewPassword(event.target.value);
            if(password === event.target.value) { setCheck(true); }
            else { setCheck(false); }
        }
        return;
    }

    const changePassword = async () => {
        const info = {password : password, newPassword : newPassword};
        try {
            const token = localStorage.getItem("Token");
            const response = await axios.patch(`${serverDomain}/user/information/password`, info, {withCredentials : true, headers : {Authorization : token}});
            if(response.status === 200) { alert("비밀번호 변경을 완료했습니다."); props.findInfo(); props.onClose(); }
        } catch(e) {
            if(e.response.status === 400) { alert("비밀번호 변경에 실패했습니다."); }
        }
    }

    return (
        <Box sx = {{padding : "12px", display : "flex", flexDirection : "column", flex : 1, height : "100%"}}>
            <Box sx = {{marginBottom : "12px"}}>
                <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>현재 비밀번호</Typography>
                <Input 
                    type = {show1 ? "text" : "password"}
                    name = "password"
                    value = {password}
                    onChange = {checkPassword}
                    placeholder = "비밀번호" 
                    startDecorator = {<Key sx = {{...iconColor}} />} 
                    endDecorator = {
                        <IconButton onClick = {() => { setShow1(!show1); }}>
                            {show1 ? <VisibilityOff sx = {{...iconColor}} /> : <Visibility sx = {{...iconColor}} />}
                        </IconButton>
                    }
                    sx = {{...inputFocusColor}} 
                />
            </Box>
            <Box sx = {{marginBottom : "12px"}}>
                <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>변경할 비밀번호</Typography>
                <Input 
                    type = {show2 ? "text" : "password"}
                    name = "newPassword"
                    value = {newPassword}
                    onChange = {checkPassword}
                    placeholder = "비밀번호" 
                    startDecorator = {<Key sx = {{...iconColor}} />} 
                    endDecorator = {
                        <IconButton onClick = {() => { setShow2(!show2); }}>
                            {show2 ? <VisibilityOff sx = {{...iconColor}} /> : <Visibility sx = {{...iconColor}} />}
                        </IconButton>
                    }
                    sx = {{...inputFocusColor}} 
                />
            </Box>
            <Button onClick = {changePassword} sx = {{...btnColor, marginTop : "12px"}}>변경하기</Button>
        </Box>
    );
}
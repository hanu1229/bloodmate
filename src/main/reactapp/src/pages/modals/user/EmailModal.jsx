import { Box, Button, IconButton, Input, Typography } from "@mui/joy";
import { btnColor, iconColor, inputErrorColor, inputFocusColor } from "../../../styles/commonStyle";
import { Email, Key, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { serverDomain } from "../../../ApiDomain";

export default function EmailModal(props) {

    const [email, setEmail] = useState(props.email);
    const [newEmail, setNewEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    
    // console.log(props.email);

    const changeEmail = async () => {
        const info = {email : email, newEmail : newEmail, password : password};
        try {
            const token = localStorage.getItem("Token");
            const response = await axios.patch(`${serverDomain}/user/information/email`, info, {withCredentials : true, headers : {Authorization : token}});
            if(response.status === 200) { alert("이메일 변경을 완료했습니다."); props.findInfo(); props.onClose(); }
        } catch(e) {
            if(e.response.status === 400) { alert("이메일 변경에 실패했습니다."); }
        }
    }

    return (
        <Box sx = {{padding : "12px", display : "flex", flexDirection : "column", flex : 1, height : "100%"}}>
            <Box sx = {{marginBottom : "12px"}}>
                <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>현재 이메일</Typography>
                <Typography startDecorator = {<Email sx = {{...iconColor, backgroundColor : "inherit"}} />} sx = {{...inputFocusColor, padding : "0px 12px", flex : 1}}>
                    {email}
                </Typography>
            </Box>
            <Box sx = {{marginBottom : "12px"}}>
                <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>변경할 이메일</Typography>
                <Input 
                    type = "text"
                    value = {newEmail}
                    onChange = {(event) => { setNewEmail(event.target.value); }} 
                    placeholder = "변경할 이메일" 
                    startDecorator = {<Email sx = {{...iconColor}} />} 
                    sx = {{...inputFocusColor}}
                />
            </Box>
            <Box sx = {{marginBottom : "12px"}}>
                <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>비밀번호</Typography>
                <Input 
                    type = {show ? "text" : "password"}
                    value = {password}
                    onChange = {(event) => { setPassword(event.target.value); }}
                    placeholder = "비밀번호" 
                    startDecorator = {<Key sx = {{...iconColor}} />} 
                    endDecorator = {
                        <IconButton onClick = {() => { setShow(!show); }}>
                            {show ? <VisibilityOff sx = {{...iconColor}} /> : <Visibility sx = {{...iconColor}} />}
                        </IconButton>
                    }
                    sx = {{...inputFocusColor}} 
                />
            </Box>
            <Button onClick = {changeEmail} sx = {{...btnColor, marginTop : "12px"}}>변경하기</Button>
        </Box>
    );
}
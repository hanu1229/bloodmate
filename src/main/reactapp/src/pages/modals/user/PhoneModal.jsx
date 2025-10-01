import { Box, Button, IconButton, Input, Typography } from "@mui/joy";
import { btnColor, iconColor, inputFocusColor } from "../../../styles/commonStyle";
import { Key, Smartphone, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { serverDomain } from "../../../ApiDomain";

export default function PhoneModal(props) {

    const [phone, setPhone] = useState(props.phone);
    const [newPhone, setNewPhone] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    
    // console.log(props.email);

    /** 변경할 전화번호 */
    const changeNewPhone = (event) => {
        let value = event.target.value.replace(/\D/g, "");
        if(value.length > 3 && value.length <= 7) {
            value = value.substring(0, 3) + "-" + value.substring(3);
        } else if(value.length > 7) {
            value = value.substring(0, 3) + "-" + value.substring(3, 7) + "-" + value.substring(7, 11);
        }
        setNewPhone(value);
    }


    const changePhone = async () => {
        const info = {phone : phone, newPhone : newPhone, password : password};
        try {
            const token = localStorage.getItem("Token");
            const response = await axios.patch(`${serverDomain}/user/information/phone`, info, {withCredentials : true, headers : {Authorization : token}});
            if(response.status === 200) { alert("전화번호 변경을 완료했습니다."); props.findInfo(); props.onClose(); }
        } catch(e) {
            if(e.response.status === 400) { alert("전화번호 변경에 실패했습니다."); }
        }
    }

    return (
        <Box sx = {{padding : "12px", display : "flex", flexDirection : "column", flex : 1, height : "100%"}}>
            <Box sx = {{marginBottom : "12px"}}>
                <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>현재 전화번호</Typography>
                <Typography startDecorator = {<Smartphone sx = {{...iconColor, backgroundColor : "inherit"}} />} sx = {{...inputFocusColor, padding : "0px 12px", flex : 1}}>
                    {phone}
                </Typography>
            </Box>
            <Box sx = {{marginBottom : "12px"}}>
                <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>변경할 전화번호</Typography>
                <Input 
                    type = "text"
                    value = {newPhone}
                    onChange = {changeNewPhone} 
                    placeholder = "변경할 전화번호" 
                    startDecorator = {<Smartphone sx = {{...iconColor}} />} 
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
            <Button onClick = {changePhone} sx = {{...btnColor, marginTop : "12px"}}>변경하기</Button>
        </Box>
    );
}
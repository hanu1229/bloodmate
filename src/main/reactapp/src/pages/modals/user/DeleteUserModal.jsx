import { Box, Button, IconButton, Input, Typography } from "@mui/joy";
import { iconColor, inputErrorColor, inputFocusColor } from "../../../styles/commonStyle";
import { CheckCircle, Email, Key, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { serverDomain } from "../../../ApiDomain";
import { useNavigate, useOutletContext } from "react-router-dom";
import useCustomNavigate from "../../../useCustomNavigate";

export default function DeleteUserModal(props) {

    const navigate = useNavigate();
    const { setLoginState } = useOutletContext();

    const [key, setKey] = useState("");
    const [checkKey, setCheckKey] = useState(true);
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    
    // console.log(props.email);

    const inputKey = (event) => {
        setKey(event.target.value);
        if(event.target.value === "탈퇴") { setCheckKey(true); }
        else { setCheckKey(false); }
    }

    const deleteUser = async () => {
        const info = {key : key, password : password};
        try {
            const token = localStorage.getItem("Token");
            const response = await axios.post(`${serverDomain}/user/information/delete`, info, {withCredentials : true, headers : {Authorization : token}});
            if(response.status === 200) {
                alert("회원 탈퇴가 완료되었습니다."); 
                props.onClose(); 
                localStorage.removeItem("Token");
                setLoginState(false);
                navigate("/", {replace : true});
            }
        } catch(e) {
            if(e.response.status === 400) { alert("회원 탈퇴에 실패했습니다."); }
        }
    }

    return (
        <Box sx = {{padding : "12px", display : "flex", flexDirection : "column", flex : 1, height : "100%"}}>
            <Box sx = {{marginBottom : "12px"}}>
                <Typography sx = {{fontSize : "24px", fontWeight : "bold", color : "red"}}>※ 계정과 건강 데이터가 영구 삭제됩니다.<br/>※ 복구할 수 없습니다.</Typography>
            </Box>
            <Box sx = {{marginBottom : "12px"}}>
                <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>탈퇴를 희망하시면 "탈퇴"를 입력해주세요.</Typography>
                <Input 
                    type = "text"
                    value = {key}
                    onChange = {inputKey} 
                    placeholder = "탈퇴" 
                    startDecorator = {<CheckCircle sx = {{...iconColor}} />} 
                    sx = {{...(checkKey ? inputFocusColor : inputErrorColor)}}
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
            <Button color = "danger" onClick = {deleteUser} sx = {{marginTop : "12px"}}>회원탈퇴</Button>
        </Box>
    );
}
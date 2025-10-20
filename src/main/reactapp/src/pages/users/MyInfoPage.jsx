import { Box, Button, Divider, IconButton, Input, Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import useCustomNavigate from "../../useCustomNavigate";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverDomain } from "../../ApiDomain";
import { btnColor } from "../../styles/commonStyle";
import EmailModal from "../modals/user/EmailModal";
import PhoneModal from "../modals/user/PhoneModal";
import { useNavigate } from "react-router-dom";
import PasswordModal from "../modals/user/PasswordModal";
import { Dangerous } from "@mui/icons-material";
import DeleteUserModal from "../modals/user/DeleteUserModal";
import { CustomModal } from "../modals/CustomModal";

export default function MyInfoPage(props) {
    const checkLogin = useCustomNavigate();
    const navigate = useNavigate();

    const [emailModal, setEmailModal] = useState(false);
    const [phoneModal, setPhoneModal] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [myInfo, setMyInfo] = useState({});
    /** true : 펼침 | false : 닫힘 */
    const [sugarGuide, setSugarGuide] = useState(false);

    const findInfo = async () => {
        try {
            const token = localStorage.getItem("Token");
            const response = await axios.get(`${serverDomain}/user/information`, {withCredentials : true, headers : {Authorization : token}});
            if(response.status == 200) { setMyInfo(response.data); }
        } catch(e) {
            if(e.response.status == 400) { alert("정보가 없습니다."); navigate("/"); }
        }
    }

    useEffect(() => { checkLogin(); findInfo(); }, []);

    return (
        <>
            <Box sx = {{boxSizing : "border-box", padding : "24px", backgroundColor : "inherit", width : "100%"}}>
                <Box sx = {{display : "flex", flexDirection : "column", minHeight : 0, alignItems : "center"}}>
                    {/* <Box sx = {{height : "320px"}}></Box> */}
                    {/* 이름(성명) */}
                    <Box sx = {{padding : "16px", display : "flex", flexDirection : "column", minHeight : 0, border : "1px solid #A097D4", borderRadius : "8px", width : "45%"}}>
                        <Box sx = {{display : "flex", justifyContent : "space-between", alignItems : "center", margin : "4px 0px"}}>
                            <Box sx = {{display : "flex"}}>
                                <Typography sx = {{fontSize : "28px", fontWeight : "bold", width : "100px"}}>이름</Typography>
                                <Typography sx = {{fontSize : "28px", fontWeight : "bold"}}>{myInfo.userName}</Typography>
                            </Box>
                        </Box>
                        {/* 생년월일 */}
                        <Box sx = {{display : "flex", justifyContent : "space-between", alignItems : "center", margin : "4px 0px", height : "32px"}}>
                            <Box sx = {{display : "flex"}}>    
                                <Typography sx = {{width : "100px"}}>생년월일</Typography>
                                <Typography>{myInfo.userBirthDate}</Typography>
                            </Box>
                        </Box>
                        {/* 닉네임 */}
                        <Box sx = {{display : "flex", justifyContent : "space-between", alignItems : "center", margin : "4px 0px", height : "32px"}}>
                            <Box sx = {{display : "flex"}}>
                                <Typography sx = {{width : "100px"}}>닉네임</Typography>
                                <Typography>{myInfo.userNickname}</Typography>
                            </Box>
                        </Box>
                        {/* 이메일 */}
                        <Box sx = {{display : "flex", justifyContent : "space-between", alignItems : "center", margin : "4px 0px"}}>
                            <Box sx = {{display : "flex"}}>
                                <Typography sx = {{width : "100px"}}>이메일</Typography>
                                <Typography>{myInfo.userEmail}</Typography>
                            </Box>
                            <Button size = "sm" sx = {{...btnColor}} onClick = {() => { setEmailModal(true); }}>수정</Button>
                            <CustomModal 
                                open = {emailModal} 
                                onClose = {(event, reason) => { reason == "backdropClick" ? setEmailModal(true) : setEmailModal(false) }}
                                title = "이메일 수정"
                            >
                                <EmailModal 
                                    email = {myInfo.userEmail} findInfo = {findInfo}
                                    onClose = {() => { setEmailModal(false); }}
                                />
                            </CustomModal>
                        </Box>
                        {/* 전화번호 */}
                        <Box sx = {{display : "flex", justifyContent : "space-between", alignItems : "center", margin : "4px 0px"}}>
                            <Box sx = {{display : "flex"}}>    
                                <Typography sx = {{width : "100px"}}>전화번호</Typography>
                                <Typography>{myInfo.userPhone}</Typography>
                            </Box>
                            <Button size = "sm" sx = {{...btnColor}} onClick = {() => { setPhoneModal(true); }}>수정</Button>
                            <CustomModal 
                                open = {phoneModal} 
                                onClose = {(event, reason) => { reason == "backdropClick" ? setPhoneModal(true) : setPhoneModal(false) }}
                                title = "전화번호 수정"
                                isInfo = {false}
                            >
                                <PhoneModal
                                    phone = {myInfo.userPhone} findInfo = {findInfo}
                                    onClose = {() => { setPhoneModal(false); }}
                                />
                            </CustomModal>
                        </Box>
                    </Box>

                    <Box sx = {{height : "20px"}}></Box>

                    {/* 비밀번호 */}
                    <Box sx = {{padding : "16px", display : "flex", flexDirection : "column", minHeight : 0, border : "1px solid #A097D4", borderRadius : "8px", width : "45%"}}>
                        <Box sx = {{display : "flex", justifyContent : "space-between", alignItems : "center", margin : "4px 0px"}}>
                            <Typography sx = {{width : "100px"}}>비밀번호</Typography>
                            <Button size = "sm" sx = {{...btnColor}} onClick = {() => { setPasswordModal(true); }}>수정</Button>
                            <CustomModal 
                                open = {passwordModal} 
                                onClose = {(event, reason) => { reason == "backdropClick" ? setPasswordModal(true) : setPasswordModal(false) }}
                                title = "비밀번호 수정"
                            >
                                <PasswordModal
                                    findInfo = {findInfo}
                                    onClose = {() => { setPasswordModal(false); }}
                                />
                            </CustomModal>
                        </Box>
                    </Box>

                    <Box sx = {{height : "20px"}}></Box>

                    {/* 회원 탈퇴 */}
                    <Box sx = {{padding : "16px", display : "flex", flexDirection : "column", minHeight : 0, border : "1px solid #A097D4", borderRadius : "8px", width : "45%"}}>
                        <Box sx = {{display : "flex", justifyContent : "start", alignItems : "center", marginBottom : "32px"}}>
                            <Dangerous sx = {{marginRight : "8px", color : "red"}} />
                            <Typography sx = {{alignItems : "center", fontSize : "20px", fontWeight : "bold", color : "red"}}>회원탈퇴</Typography>    
                        </Box>
                        <Typography sx = {{marginBottom : "32px"}}>※ 계정과 건강 데이터가 영구 삭제됩니다.<br/>※ 복구할 수 없습니다.</Typography>
                        <Box sx = {{display : "flex", justifyContent : "space-between", alignItems : "center"}}>
                            <Button size = "sm" color = "danger" sx = {{width : "100%"}} onClick = {() => { setDeleteModal(true); }}>탈퇴하기</Button>
                            <CustomModal 
                                open = {deleteModal} 
                                onClose = {(event, reason) => { reason == "backdropClick" ? setDeleteModal(true) : setDeleteModal(false) }}
                                title = "회원 탈퇴"
                            >
                                <DeleteUserModal
                                    findInfo = {findInfo}
                                    onClose = {() => { setDeleteModal(false); }}
                                />
                            </CustomModal>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </>
    );
}
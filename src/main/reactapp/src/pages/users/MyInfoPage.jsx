    import { Box, Button, Divider, IconButton, Input, Modal, ModalClose, Sheet, Typography } from "@mui/joy";
    import useCustomNavigate from "../../useCustomNavigate";
    import { useEffect, useState } from "react";
    import axios from "axios";
    import { serverDomain } from "../../ApiDomain";
    import { DataGrid, gridPaginatedVisibleSortedGridRowEntriesSelector, useGridApiRef } from "@mui/x-data-grid";
    import { ArrowDropDown, ArrowDropUp, ArrowRight } from "@mui/icons-material";
    import { LineChart } from "@mui/x-charts";
    import { btnColor } from "../../styles/commonStyle";
    import EmailModal from "../modals/EmailModal";
    import NicknameModal from "../modals/NicknameModal";
    import PhoneModal from "../modals/PhoneModal";
    import AddressModal from "../modals/AddressModal";


    export function CustomModal(props) {
        return (
            <Modal 
                aria-labelledby="modal-title" 
                aria-describedby="modal-desc" 
                open = {props.open} 
                onClose = {props.onClose} 
                /** 블러 처리 삭제 */
                slots = {{backdrop : "span"}}
                sx = {{
                    display : "flex", justifyContent : "center", alignItems : "center"
                    }}
            >
                <Sheet 
                    variant = "outlined" 
                    sx = {{
                        display : "flex",
                        flexDirection : "column",
                        padding : "12px",
                        minWidth : "400px", maxWidth : "480px", 
                        minHeight : 0, maxHeight : "480px", 
                        borderRadius : "16px", boxShadow : "lg",
                        overflowY : "hidden"
                    }}
                >
                    <ModalClose variant = "outlined"/>
                    <Typography sx = {{marginLeft : "12px", marginBottom : "12px", fontSize : "20px", fontWeight : "bold"}}>{props.title}</Typography>
                    <Box sx = {{width : "100%", height : "100%", overflowY : "auto", overflowX : "hidden", minHeight : 0}}>
                        {props.children}
                    </Box>
                </Sheet>
            </Modal>
        );
    }


    export default function MyInfoPage(props) {
        const checkLogin = useCustomNavigate();

        const [nameModal, setNameModal] = useState(false);
        const [emailModal, setEmailModal] = useState(false);
        const [nicknameModal, setNicknameModal] = useState(false);
        const [phoneModal, setPhoneModal] = useState(false);
        const [addressModal, setAddressModal] = useState(false);

        const [bloodSugarInfo, setBloodSugarInfo] = useState([]);
        /** true : 펼침 | false : 닫힘 */
        const [sugarGuide, setSugarGuide] = useState(false);

        useEffect(() => { checkLogin(); }, []);

        return (
            <>
                <Box sx = {{boxSizing : "border-box", padding : "24px", backgroundColor : "inherit", width : "100%"}}>
                    <Box sx = {{display : "flex", flexDirection : "column", minHeight : 0}}>
                        {/* <Typography>혈당</Typography> */}
                        {/* <Typography>{JSON.stringify(bloodSugarInfo)}</Typography> */}
                        {/* <Box sx = {{height : "32px"}}></Box> */}
                        {/* <Box sx = {{height : "320px"}}></Box> */}
                        {/* <Box sx = {{height : "32px"}}></Box> */}
                        <Typography><strong>내정보</strong></Typography>
                        <Divider sx = {{margin : "12px 0px", height : "1px"}} />
                        <Box sx = {{padding : "16px", display : "flex", flexDirection : "column", minHeight : 0, border : "1px solid #A097D4", borderRadius : "8px", width : "45%"}}>
                            <Box sx = {{display : "flex", justifyContent : "space-between", alignItems : "center", margin : "4px 0px"}}>
                                <Box sx = {{display : "flex"}}>
                                    <Typography sx = {{fontSize : "28px", fontWeight : "bold", width : "100px"}}>이름</Typography>
                                    <Typography sx = {{fontSize : "28px", fontWeight : "bold"}}>한웅재</Typography>
                                </Box>
                                {/* <Button size = "sm" onClick = {() => { setNameModal(true); }} sx ={{...btnColor}}>실명 수정</Button> */}
                            </Box>
                            <Box sx = {{display : "flex", justifyContent : "space-between", alignItems : "center", margin : "4px 0px"}}>
                                <Box sx = {{display : "flex"}}>
                                    <Typography sx = {{width : "100px"}}>이메일</Typography>
                                    <Typography>han494127@naver.com</Typography>
                                </Box>
                                <Button size = "sm" sx = {{...btnColor}} onClick = {() => { setEmailModal(true); }}>수정</Button>
                                <CustomModal 
                                    open = {emailModal} 
                                    onClose = {(event, reason) => { reason == "backdropClick" ? setEmailModal(true) : setEmailModal(false) }}
                                    title = "이메일 수정"
                                >
                                    <EmailModal></EmailModal>
                                </CustomModal>
                            </Box>
                            <Box sx = {{display : "flex", justifyContent : "space-between", alignItems : "center", margin : "4px 0px"}}>
                                <Box sx = {{display : "flex"}}>
                                    <Typography sx = {{width : "100px"}}>닉네임</Typography>
                                    <Typography>하누</Typography>
                                </Box>
                                <Button size = "sm" sx = {{...btnColor}} onClick = {() => { setNicknameModal(true); }}>수정</Button>
                                <CustomModal 
                                    open = {nicknameModal} 
                                    onClose = {(event, reason) => { reason == "backdropClick" ? setNicknameModal(true) : setNicknameModal(false) }}
                                    title = "닉네임 수정"
                                >
                                    <NicknameModal></NicknameModal>
                                </CustomModal>
                            </Box>
                            <Box sx = {{display : "flex", justifyContent : "space-between", alignItems : "center", margin : "4px 0px"}}>
                                <Box sx = {{display : "flex"}}>    
                                    <Typography sx = {{width : "100px"}}>전화번호</Typography>
                                    <Typography>010-XXXX-XXXX</Typography>
                                </Box>
                                <Button size = "sm" sx = {{...btnColor}} onClick = {() => { setPhoneModal(true); }}>수정</Button>
                                <CustomModal 
                                    open = {phoneModal} 
                                    onClose = {(event, reason) => { reason == "backdropClick" ? setPhoneModal(true) : setPhoneModal(false) }}
                                    title = "전화번호 수정"
                                >
                                    <PhoneModal></PhoneModal>
                                </CustomModal>
                            </Box>
                            <Box sx = {{display : "flex", justifyContent : "space-between", alignItems : "center", margin : "4px 0px"}}>
                                <Box sx = {{display : "flex"}}>    
                                    <Typography sx = {{width : "100px"}}>주소</Typography>
                                    <Typography>경기도 부천시 ~</Typography>
                                </Box>
                                <Button size = "sm" sx = {{...btnColor}} onClick = {() => { setAddressModal(true); }}>수정</Button>
                                <CustomModal 
                                    open = {addressModal} 
                                    onClose = {(event, reason) => { reason == "backdropClick" ? setAddressModal(true) : setAddressModal(false) }}
                                    title = "주소 수정"
                                >
                                    <AddressModal></AddressModal>
                                </CustomModal>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </>
        );
    }
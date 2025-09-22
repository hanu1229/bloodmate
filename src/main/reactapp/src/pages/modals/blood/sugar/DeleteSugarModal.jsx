import { Box, Button, IconButton, Input, Option, Select, Typography } from "@mui/joy";
import { btnColor, iconColor, inputFocusColor } from "../../../../styles/commonStyle";
import { CalendarMonth, CalendarToday, WaterDrop } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverDomain } from "../../../../ApiDomain";
import { referenceLineClasses } from "@mui/x-charts";

export default function DeleteSugarModal(props) {

    const deleteSugar = async () => {
        // alert(`측정일 : ${date}\n측정 시간 : ${time}\n측정 상황 : ${context}\n혈당 수치 : ${sugar}\n${measuredAt}`);
        const answer = confirm("정말 삭제하시겠습니까?");
        if(!answer) { return; }
        try {
            const token = localStorage.getItem("Token");
            const response = await axios.delete(`${serverDomain}/blood/sugar/${props.rowInfo.bloodSugarId}`, {withCredentials : true, headers : {Authorization : token}});
            if(response.status === 200) {
                alert("정상적으로 삭제되었습니다.");
                props.findAll();
                props.onClose();
            }
        } catch(e) {
            if(e.response.status === 400) {
                alert("정상적으로 삭제하지 못했습니다.");
            }
        }
    }
    
    return (
        <Box sx = {{padding : "12px", display : "flex", flexDirection : "column", flex : 1, height : "100%"}}>
            {/* 측정일, 측정시간 */}
            <Box sx = {{marginBottom : "24px", display : "flex", justifyContent : "space-between", alignItems : "center"}}>
                <Box>
                    <Typography sx = {{marginBottom : "4px", color : "red", fontSize : "20px", fontWeight : "bold"}}>※ 정말 삭제하시겠습니까?</Typography>
                    <Typography sx = {{marginBottom : "4px", color : "red", fontSize : "20px", fontWeight : "bold"}}>※ 데이터가 영구 삭제됩니다.</Typography>
                    <Typography sx = {{marginBottom : "4px", color : "red", fontSize : "20px", fontWeight : "bold"}}>※ 복구할 수 없습니다.</Typography>
                </Box>
            </Box>
            <Button color = "danger" onClick = {deleteSugar}>삭제하기</Button>
        </Box>
    );
}
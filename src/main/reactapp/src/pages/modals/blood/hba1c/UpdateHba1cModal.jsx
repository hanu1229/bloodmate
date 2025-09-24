import { Box, Button, Input, Option, Select, Tooltip, Typography } from "@mui/joy";
import { btnColor, iconColor, inputFocusColor } from "../../../../styles/commonStyle";
import { Assessment, CalendarMonth, Info, WaterDrop } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverDomain } from "../../../../ApiDomain";

export default function UpdateHba1cModal(props) {

    const inputRef = useRef(null);

    const [hba1c, setHba1c] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [nextTestAt, setNextTestAt] = useState("");


    useEffect(() => { 
        console.log(props.rowInfo);
        setHba1c(props.rowInfo.hba1cValue);
        setDate(props.rowInfo.measureDate);
        setTime(props.rowInfo.measureTime);
        setNextTestAt(props.rowInfo.nextTestAt);
    }, []);

    const updateHba1c = async () => {
        const measuredAt = `${date}T${time}:00`;
        let nextTest;
        if(nextTestAt.length === 10) {
            nextTest = `${nextTestAt}T00:00:00`;
        } else if(nextTestAt.length > 10 || nextTestAt.length <= 16) {
            nextTest = `${nextTestAt}:00`;
        }
        // alert(`측정일 : ${date}\n측정 시간 : ${time}\n측정 상황 : ${context}\n혈당 수치 : ${sugar}\n${measuredAt}`);
        try {
            const token = localStorage.getItem("Token");
            const info = {hba1cValue : hba1c, measuredAt : measuredAt, nextTestAt : nextTest};
            const response = await axios.put(`${serverDomain}/blood/hba1c/${props.rowInfo.hba1cId}`, info, {withCredentials : true, headers : {Authorization : token}});
            if(response.status === 200) {
                alert("정상적으로 수정되었습니다.");
                props.findAll();
                props.onClose();
            }
        } catch(e) {
            if(e.response.status === 400) {
                alert("정상적으로 수정하지 못했습니다.");
            }
        }
    }
    /// 측정일 관련 함수
    const changeDate = (event) => {
        // 숫자만 남기는 정규표현식 방식
        let value = event.target.value.replace(/\D/g, "");
        console.log(value.length);
        // YYYY-MM-DD 형식으로 잘라서 조합
        if(value.length > 4 && value.length <= 6) {
            value = value.substring(0, 4) + "-" + value.substring(4);
        } else if(value.length > 6) {
            value = value.substring(0, 4) + "-" + value.substring(4, 6) + "-" + value.substring(6, 8);
        }
        setDate(value);
    }
    /// 측정 시간 관련 함수
    const changeTime = (event) => {
        // 숫자만 남기는 정규표현식 방식
        let value = event.target.value.replace(/\D/g, "");
        // HH:mm 형식으로 잘라서 조합
        if(value.length > 2 && value.length <= 4) {
            value = value.substring(0, 2) + ":" + value.substring(2);
        } else if(value.length > 4) {
            value = value.substring(0, 2) + ":" + value.substring(2, 4);
        }
        setTime(value);
    }
    /// 다음 검사 예정일 관련 함수
    const changeNextTestAt = (event) => {
        let value = event.target.value.replace(/\D/g, "");
        if(value.length < 13) {
            if(value.length > 4 && value.length <= 6) {
                value = value.substring(0, 4) + "-" + value.substring(4);
            } else if(value.length > 6 && value.length <= 8){
                value = value.substring(0, 4) + "-" + value.substring(4, 6) + "-" + value.substring(6, 8);
            } else if(value.length > 8 && value.length <= 10) {
                value = value.substring(0, 4) + "-" + value.substring(4, 6) + "-" + value.substring(6, 8) + "T" + value.substring(8, 10);
            } else if(value.length > 10 && value.length <= 12) {
                value = value.substring(0, 4) + "-" + value.substring(4, 6) + "-" + value.substring(6, 8) + "T" + 
                value.substring(8, 10) + ":" + value.substring(10, 12);
            }
            setNextTestAt(value);
        }
        console.log(value);
    }

    return (
        <Box sx = {{padding : "12px", display : "flex", flexDirection : "column", flex : 1, height : "100%"}}>
            {/* 측정일, 측정시간 */}
            <Box sx = {{ marginBottom : "12px", display : "flex", justifyContent : "space-between", alignItems : "center"}}>
                <Box sx = {{width : "48%"}}>
                    <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>측정일 (예시 : 20250101)</Typography>
                    <Input type = "text" value = {date} onChange = {changeDate} placeholder = "예시 : 20250101" sx = {{...inputFocusColor}} />
                </Box>
                <Box sx = {{width : "48%"}}>
                    <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>측정 시간 (예시 : 05:08)</Typography>
                    <Input type = "text" value = {time} onChange = {changeTime} placeholder = "예시 : 05:08" sx = {{...inputFocusColor}} />
                </Box>
            </Box>
            {/* 당화혈색소 수치 */}
            <Box sx = {{display : "flex", justifyContent : "space-between"}}>
                <Box sx = {{width : "48%"}}>
                    <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>당화혈색소 수치</Typography>
                    <Input 
                        type = "text"
                        value = {hba1c}
                        onChange = {(event) => { setHba1c(event.target.value); }} 
                        placeholder = "당화혈색소 수치"
                        startDecorator = {<WaterDrop sx = {{...iconColor}} />} 
                        endDecorator = {"%"}
                        sx = {{...inputFocusColor}}
                    />
                </Box>
                <Box sx = {{width : "48%"}}>
                    <Box sx = {{marginBottom : "4px", display : "flex", justifyContent : "start", alignItems : "center"}}>
                        <Typography sx = {{margin : "0px 4px"}}>다음 검사 예정일</Typography>
                        <Tooltip
                            title = "날짜만 작성해도 됩니다."
                            sx = {{...btnColor}}
                        >
                            <Info sx ={{width : "20px", height : "20px", color : "grey"}} />
                        </Tooltip>
                    </Box>
                    <Input 
                        type = "text"
                        value = {nextTestAt}
                        onChange = {changeNextTestAt} 
                        placeholder = "다음 검사 예정일"
                        startDecorator = {<CalendarMonth sx = {{...iconColor}} />} 
                        sx = {{...inputFocusColor}}
                    />
                </Box>
            </Box>
            <Button onClick = {updateHba1c} sx = {{...btnColor, marginTop : "12px"}}>수정하기</Button>
        </Box>
    );
}
import { Box, Button, IconButton, Input, Option, Select, Typography } from "@mui/joy";
import { btnColor, iconColor, inputFocusColor } from "../../../../styles/commonStyle";
import { CalendarMonth, CalendarToday, WaterDrop } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverDomain } from "../../../../ApiDomain";

export default function UpdateSugarModal(props) {

    const inputRef = useRef(null);

    const [sugar, setSugar] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [context, setContext] = useState(null);
    const [contextOption, setContextOption] = useState([]);

    useEffect(() => { 
        measureFindAll();
        console.log(props.rowInfo);
        setSugar(props.rowInfo.value);
        setDate(props.rowInfo.measureDate);
        setTime(props.rowInfo.measureTime);
        setContext(props.rowInfo.contextId);
    }, []);

    const measureFindAll = async () => {
        try {
            const response = await axios.get(`${serverDomain}/blood/measurement`);
            if(response.status === 200) { console.table(response.data); setContextOption(response.data); }
        } catch(e) {
            if(e.response.status === 400) { console.log(response.data); }
        }
    }

    const updateSugar = async () => {
        const measuredAt = `${date}T${time}:00`;
        // alert(`측정일 : ${date}\n측정 시간 : ${time}\n측정 상황 : ${context}\n혈당 수치 : ${sugar}\n${measuredAt}`);
        try {
            const token = localStorage.getItem("Token");
            const info = {bloodSugarValue : sugar, measurementContextId : context, measuredAt : measuredAt};
            const response = await axios.put(`${serverDomain}/blood/sugar/${props.rowInfo.bloodSugarId}`, info, {withCredentials : true, headers : {Authorization : token}});
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
            {/* 측정 상황, 혈당 수치 */}
            <Box sx = {{ marginBottom : "12px", display : "flex", justifyContent : "space-between"}}>
                <Box sx = {{width : "48%"}}>
                    {/* 측정 상황 */}
                    <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>측정 상황</Typography>
                    <Select 
                        value = {context} 
                        onChange = {(event, value) => { setContext(value); console.log(value); }} 
                        placeholder = "선택해주세요"
                        slotProps = {{
                            listbox: {
                                placement: 'bottom-start',
                                sx: { maxHeight: 320, overflow: 'auto' },
                            },
                        }}
                        sx = {{...inputFocusColor}}
                    >
                        {
                            contextOption.map((element) => {
                                return (<Option key = {element.mcId} value = {element.mcId}>{element.mcCode}</Option>); 
                            })
                        }
                    </Select>
                </Box>
                {/* 혈당 수치 */}
                <Box sx = {{width : "48%"}}>
                    <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>혈당 수치</Typography>
                    <Input 
                        type = "text"
                        value = {sugar}
                        onChange = {(event) => { setSugar(event.target.value); }} 
                        placeholder = "혈당 수치"
                        startDecorator = {<WaterDrop sx = {{...iconColor}} />} 
                        endDecorator = {"mg/dL"}
                        sx = {{...inputFocusColor}}
                    />
                </Box>
            </Box>
            <Button onClick = {updateSugar} sx = {{...btnColor, marginTop : "12px"}}>수정하기</Button>
        </Box>
    );
}
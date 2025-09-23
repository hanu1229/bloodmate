import { Box, Button, Input, Option, Select, Typography } from "@mui/joy";
import { btnColor, iconColor, inputFocusColor } from "../../../../styles/commonStyle";
import { MonitorHeart } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverDomain } from "../../../../ApiDomain";

export default function CreatePressureModal(props) {

    const inputRef = useRef(null);

    const [systolic, setSystolic] = useState("");
    const [diastolic, setDiastolic] = useState("");
    const [pulse, setPulse] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [context, setContext] = useState(null);
    const [contextOption, setContextOption] = useState([]);

    useEffect(() => { 
        measureFindAll();
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        console.log(`${year}-${month}-${day}T${hours}:${minutes}:00`);
    }, []);

    const measureFindAll = async () => {
        try {
            const response = await axios.get(`${serverDomain}/blood/measurement`);
            if(response.status === 200) { console.table(response.data); setContextOption(response.data); }
        } catch(e) {
            if(e.response.status === 400) { console.log(response.data); }
        }
    }

    const createPressure = async () => {
        const measuredAt = `${date}T${time}:00`;
        // alert(`측정일 : ${date}\n측정 시간 : ${time}\n측정 상황 : ${context}\n맥박 : ${pulse}\n수축 : ${systolic}\n이완 : ${diastolic}`);
        try {
            const token = localStorage.getItem("Token");
            const info = {
                bloodPressureSystolic : systolic, bloodPressureDiastolic : diastolic, bloodPressurePulse : pulse, 
                measuredAt : measuredAt, measurementContextId : context
            };
            const response = await axios.post(`${serverDomain}/blood/pressure`, info, {withCredentials : true, headers : {Authorization : token}});
            if(response.status === 201) {
                alert("정상적으로 추가되었습니다.");
                props.findAll();
                props.onClose();
            }
        } catch(e) {
            if(e.response.status === 400) {
                alert("정상적으로 추가하지 못했습니다.");
            }
        }
    }

    /** 측정일 */
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
    /** 측정 시간 */
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
    /** 맥박 수치 */
    const changePulse = (event) => {
        const value = event.target.value.replace(/\D/g, "");
        setPulse(value);
    }
    /** 수축 수치 */
    const changeSystolic = (event) => {
        const value = event.target.value.replace(/\D/g, "");
        setSystolic(value);
    }
    /** 이완 수치 */
    const changeDiastolic = (event) => {
        const value = event.target.value.replace(/\D/g, "");
        setDiastolic(value);
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
                    <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>맥박 수치</Typography>
                    <Input 
                        type = "text"
                        value = {pulse}
                        onChange = {(event) => { setPulse(event.target.value); }} 
                        placeholder = "맥박 수치"
                        startDecorator = {<MonitorHeart sx = {{...iconColor}} />} 
                        endDecorator = {"회"}
                        sx = {{...inputFocusColor}}
                    />
                </Box>
            </Box>
            {/* 수축 수치, 이완 수치 */}
            <Box sx = {{ marginBottom : "12px", display : "flex", justifyContent : "space-between"}}>
                <Box sx = {{width : "48%"}}>
                    {/* 수축 수치 */}
                    <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>수축 수치</Typography>
                    <Input
                        type = "text"
                        value = {systolic} 
                        onChange = {changeSystolic} 
                        placeholder = "수축 수치"
                        endDecorator = {"mmHg"}
                        sx = {{...inputFocusColor}}
                    />
                </Box>
                {/* 이완 수치 */}
                <Box sx = {{width : "48%"}}>
                    <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>이완 수치</Typography>
                    <Input 
                        type = "text"
                        value = {diastolic}
                        onChange = {changeDiastolic} 
                        placeholder = "이완 수치"
                        endDecorator = {"mmHg"}
                        sx = {{...inputFocusColor}}
                    />
                </Box>
            </Box>
            <Button onClick = {createPressure} sx = {{...btnColor, marginTop : "12px"}}>추가하기</Button>
        </Box>
    );
}
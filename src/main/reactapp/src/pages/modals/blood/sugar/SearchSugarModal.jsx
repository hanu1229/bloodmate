import { Box, Button, Input, Option, Select, Typography } from "@mui/joy";
import { btnColor, inputFocusColor } from "../../../../styles/commonStyle";
import { useEffect, useState } from "react";
import { serverDomain } from "../../../../ApiDomain";
import axios from "axios";

export default function SearchSugarModal(props) {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [context, setContext] = useState(0);
    const [contextOption, setContextOption] = useState([]);

    useEffect(() => { measureFindAll(); }, []);

    /** 측정 상황 불러오기 */
    const measureFindAll = async () => {
        try {
            const response = await axios.get(`${serverDomain}/blood/measurement`);
            if(response.status === 200) { console.table(response.data); setContextOption(response.data); }
        } catch(e) {
            if(e.response.status === 400) { console.log(e.response.data); }
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
        event.target.name === "startDate" ? setStartDate(value) : setEndDate(value);
    }

    // console.log(`startDate : ${startDate}`);
    // console.log(`endDate : ${endDate}`);

    return (
        <Box sx = {{padding : "12px", display : "flex", flexDirection : "column", flex : 1, height : "100%"}}>
            <Typography>개발 중...</Typography>
            {/* <Typography sx = {{marginBottom : "12px"}}>측정일</Typography>
            <Box sx = {{ marginBottom : "12px", display : "flex", justifyContent : "space-between", alignItems : "center"}}>
                <Input type = "text" name = "startDate" value = {startDate} onChange = {changeDate} placeholder = "예시 : 2025-01-01" sx = {{...inputFocusColor, width : "48%"}} />
                <Typography sx = {{margin : "0px 8px"}}> ~ </Typography>
                <Input type = "text" name = "endDate" value = {endDate} onChange = {changeDate} placeholder = "예시 : 2025-01-02" sx = {{...inputFocusColor, width : "48%"}} />
            </Box>
            <Typography sx = {{marginBottom : "12px"}}>측정 상황</Typography>
            <Select
                value = {context} 
                defaultValue = {context}
                onChange = {(event, value) => { setContext(value); console.log(value); }} 
                placeholder = "선택해주세요"
                sx = {{...inputFocusColor, marginBottom : "12px"}}
            >
                <Option key = {0} value = {0}>선택해주세요</Option>
                {
                    contextOption.map((element) => {
                        return (<Option key = {element.mcId} value = {element.mcId}>{element.mcCode}</Option>); 
                    })
                }
            </Select>
            <Button sx = {{...btnColor, marginTop : "12px"}}>검색하기</Button> */}
        </Box>
    );
}
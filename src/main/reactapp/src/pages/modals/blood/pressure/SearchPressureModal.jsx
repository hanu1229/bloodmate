import { Box, Button, Input, Option, Select, Typography } from "@mui/joy";
import { btnColor, inputFocusColor } from "../../../../styles/commonStyle";
import { useEffect, useState } from "react";
import { serverDomain } from "../../../../ApiDomain";
import axios from "axios";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { continuousColorLegendClasses } from "@mui/x-charts";
import "dayjs/locale/ko";
import dayjs from "dayjs";

export default function SearchPressureModal(props) {

    const [startDate, setStartDate] = useState(props.dateRange.startDate);
    const [endDate, setEndDate] = useState(props.dateRange.endDate);
    const [context, setContext] = useState(props.choiceContext);
    const [sorting, setSorting] = useState(props.sorting);
    const [contextOption, setContextOption] = useState([]);
    const [clickStartDate, setClickStartDate] = useState(false);
    const [clickEndDate, setClickEndDate] = useState(false);

    useEffect(() => { measureFindAll(); }, []);
    useEffect(() => { console.log(`context : ${context}`)}, [context]);

    /** 캘린더 속성 */
    const datePickerSlotProps = {
        textField : {
            size : "small", 
            sx : {
                ...inputFocusColor, 
                // "& .MuiPickersOutlinedInput-root .MuiPickersOutlinedInput-notchedOutline": {borderColor : "#A097D4"},
                "& .MuiPickersOutlinedInput-root:hover .MuiPickersOutlinedInput-notchedOutline": {borderColor : "#A097D4"},
                "& .MuiPickersOutlinedInput-root.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {borderColor : "#A097D4"},
            }
        },
        day : {
            sx : {
                // 선택된 날짜
                "&.Mui-selected": {backgroundColor: "#A097D4 !important",color: "#fff"},
                // 선택된 날짜 hover
                "&.Mui-selected:hover": {backgroundColor: "#8F86C9 !important"},
                // 선택된 날짜 focus
                "&.Mui-selected:focus": {backgroundColor: "#A097D4 !important"},
            }
        }
    }

    /** 측정 상황 불러오기 */
    const measureFindAll = async () => {
        try {
            const response = await axios.get(`${serverDomain}/blood/measurement`);
            if(response.status === 200) { console.table(response.data); setContextOption([{mcId : 0, mcCode : "전체"}, ...response.data]); }
        } catch(e) {
            if(e.response.status === 400) { console.log(e.response.data); }
        }
    }

    /** 날짜 기간으로 조회하기 */
    const searchData = async () => {
        console.log(`startDate : ${startDate} / endDate : ${endDate} / context : ${context}, sorting : ${sorting}`)
        try {
            await props.findDate(startDate, endDate, context, sorting);
            props.onClose();
        } catch(e) {

        }
    }
    /** 시작날짜 */
    const clickStartDateInput = () => {
        if(clickStartDate) {
            setClickStartDate(!clickStartDate);
        } else {
            setClickStartDate(!clickStartDate);
        }
    }

    /** 끝날짜 */
    const clickEndDateInput = () => {
        if(clickStartDate) {
            setClickEndDate(!clickEndDate);
        } else {
            setClickEndDate(!clickEndDate);
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

    console.log(`startDate : ${startDate}`);
    console.log(`endDate : ${endDate}`);

    return (
        <Box sx = {{padding : "12px", display : "flex", flexDirection : "column", flex : 1, height : "100%"}}>
            {/* <Typography>개발 중...</Typography> */}
            {/* ↓ 측정일 컴포넌트 ↓ */}
            <Typography sx = {{marginBottom : "12px"}}>측정일 (예시 : 2025-01-01)</Typography>
            <Box sx = {{ marginBottom : "12px", display : "flex", justifyContent : "space-between", alignItems : "center"}}>
                <Box sx = {{maxWidth : "47%", maxHeight : "40%"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale = "ko">
                    <DesktopDatePicker
                        name = "startDate"
                        format = "YYYY-MM-DD"
                        value = {startDate ? dayjs(startDate) : null}
                        onChange = {(newValue) => {
                            let value = dayjs(newValue).format("YYYY-MM-DD")
                            setStartDate(value);
                        }}
                        slotProps = {datePickerSlotProps}   
                    />
                </LocalizationProvider>
                </Box>
                <Typography sx = {{margin : "0px 8px"}}> ~ </Typography>
                <Box sx = {{maxWidth : "47%", maxHeight : "40%"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale = "ko">
                    <DesktopDatePicker
                        name = "endDate"
                        format = "YYYY-MM-DD"
                        value = {endDate ? dayjs(endDate) : null}
                        onChange = {(newValue) => {
                            let value = dayjs(newValue).format("YYYY-MM-DD")
                            setEndDate(value);
                        }}
                        slotProps = {datePickerSlotProps}
                    />
                </LocalizationProvider>
                </Box>
            </Box>
            {/* ↑ 측정일 컴포넌트 ↑ */}
            {/* ↓ 측정상황 컴포넌트 ↓ */}
            <Box sx = {{marginBottom : "12px", display : "flex", justifyContent : "space-between", alignItems : "center"}}>
                <Box sx = {{width : "47%"}}>
                    <Typography sx = {{marginBottom : "12px"}}>측정 상황</Typography>
                    <Select
                        defaultValue = {context}
                        onChange = {(event, newValue) => setContext(newValue)}
                    >
                    {
                        contextOption.map((option) => (
                            <Option value = {option.mcId}>{option.mcCode}</Option>
                        ))
                    }
                    </Select>
                </Box>
                <Box sx = {{width : "47%"}}>
                    <Typography sx = {{marginBottom : "12px"}}>정렬 방식 (날짜 기준)</Typography>
                    <Select
                        defaultValue = {sorting}
                        onChange = {(event, newValue) => setSorting(newValue)}
                    >
                        <Option value = "DESC">내림차순</Option>
                        <Option value = "ASC">오름차순</Option>
                    </Select>
                </Box>
            </Box>
            <Button sx = {{...btnColor, marginTop : "12px"}} onClick = {searchData}>조회하기</Button>
        </Box>
    );
}
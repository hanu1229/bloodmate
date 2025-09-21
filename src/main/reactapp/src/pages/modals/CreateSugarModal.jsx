import { Box, Button, IconButton, Input, Option, Select, Typography } from "@mui/joy";
import { btnColor, iconColor, inputFocusColor } from "../../styles/commonStyle";
import { CalendarMonth, CalendarToday, WaterDrop } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverDomain } from "../../ApiDomain";
import { referenceLineClasses } from "@mui/x-charts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { createTheme, StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { PickersActionBar } from "@mui/x-date-pickers/PickersActionBar";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";
import { renderDigitalClockTimeView } from "@mui/x-date-pickers/timeViewRenderers";

export default function CreateSugarModal(props) {

    const inputRef = useRef(null);
    dayjs.locale("ko");

    const [sugar, setSugar] = useState("");
    const [date, setDate] = useState(dayjs());
    const [context, setContext] = useState(null);
    const [contextOption, setContextOption] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => { measureFindAll(); }, []);
    
    // console.log(props.email);

    const measureFindAll = async () => {
        try {
            const response = await axios.get(`${serverDomain}/blood/measurement`);
            if(response.status === 200) { console.table(response.data); setContextOption(response.data); }
        } catch(e) {
            if(e.response.status === 400) { console.log(response.data); }
        }
    }

    const createsugar = async () => {
        alert(`측정일 : ${date}\n측정 상황 : ${context}\n혈당 수치 : ${sugar}`);
    }

    /// 데이터픽커 열기
    const openPicker = () => {
        const element = inputRef.current;
        if(!element) { return; }
        // 크로스브라우저 : 지원되면 showPicker 아니면 포커스
        if(typeof element.showPicker === "function") { element.showPicker(); }
        else { element.focus(); }
    }

    const muiTheme = createTheme({
        palette: { primary: { main: '#A097D4' } },
        typography: {
            fontFamily: '"Roboto","Noto Sans KR",system-ui,sans-serif',
            allVariants: { lineHeight: 1.5, letterSpacing: 0 },
        },
    });

    return (
        <Box sx = {{padding : "12px", display : "flex", flexDirection : "column", flex : 1, height : "100%"}}>
            {/* 측정일, 측정 상황 */}
            <Box sx = {{ marginBottom : "12px", display : "flex", justifyContent : "space-between"}}>
                <Box sx = {{marginRight : "20px"}}>
                    <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>측정일</Typography>
                    <StyledEngineProvider injectFirst>
                        <ThemeProvider theme = {muiTheme}>
                            <LocalizationProvider dateAdapter = {AdapterDayjs} adapterLocale = "ko">
                                <MobileDateTimePicker
                                    value = {date}
                                    onChange = {(newValue) => setDate(newValue)}
                                    views = {['year', 'month', 'day', 'hours', 'minutes']}
                                    format = "YYYY년 MM월 DD일 HH:mm"
                                    ampm={false}
                                    orientation="portrait"
                                    // viewRenderers = {{
                                    //     hours : (params) => {
                                    //         const {timeSteps, shouldRenderTimeInASingleColumn, ...rest} = params;
                                    //         return (
                                    //             <DigitalClock 
                                    //                 {...rest}
                                    //                 timeStep = {60}
                                    //                 sx = {{
                                    //                     maxHeight : "300px",
                                    //                     overflowY : "auto",
                                    //                     overflowX : "hidden",
                                    //                     "& .MuiButtonBase-root" : {justifyContent : "flex-start"}
                                    //                 }}
                                    //                 />
                                    //         );
                                    //     },
                                    //     minutes : (params) => {
                                    //         const { timeSteps, shouldRenderTimeInASingleColumn, ...rest } = params;
                                    //         return (
                                    //             <DigitalClock 
                                    //                 {...rest}
                                    //                 timeStep = {1}
                                    //                 sx = {{
                                    //                     maxHeight : "300px",
                                    //                     overflowY : "auto",
                                    //                     overflowX : "hidden",
                                    //                     "& .MuiButtonBase-root" : {
                                    //                         justifyContent : "flex-start"
                                    //                     }
                                    //                 }}
                                    //             />
                                    //         )
                                    //     }
                                    // }}
                                    viewRenderers={{
                                        hours: renderDigitalClockTimeView,
                                        minutes: renderDigitalClockTimeView,
                                    }}
                                    timeSteps={{ hours: 1, minutes: 1 }}
                                    shouldRenderTimeInASingleColumn
                                    slotProps = {{
                                        actionBar : {actions : ["today", "accept", "cancel"]},
                                        dialog: {
                                            // ✅ 다이얼로그 자체 옵션
                                            sx: { overflow: 'visible', zIndex: (t) => t.zIndex.modal + 1 },
                                            disableScrollLock: true,                // Joy Modal과 스크롤락 충돌 방지
                                            container: typeof window !== 'undefined' ? document.body : undefined, // 항상 body로 포탈
                                        },
                                        mobilePaper: {
                                            sx: {
                                                // 🔧 짤림 방지 핵심
                                                width : "320px",
                                                maxWidth : "calc(100% - 32px)",
                                                overflow: 'visible',
                                                maxHeight: 'unset',                 // 다이얼로그 높이 제한 해제
                                                fontFamily: '"Roboto","Noto Sans KR",system-ui,sans-serif',
                                                lineHeight: 1.5,
                                                letterSpacing: 0,

                                                // 내부 레이아웃/휠 영역도 오버플로우 해제
                                                '& .MuiPickersLayout-contentWrapper': { overflow: 'visible' },
                                                '& .MuiMultiSectionDigitalClock-root': { overflowX: 'hidden', overflowY : "visible", height : "320px" },
                                                // 휠 높이 보장(필요 시 값 조절)
                                                '& .MuiMultiSectionDigitalClockSection-root': { maxHeight: "320px", overflowY : "auto", overflowX : "hidden", scrollbarGutter : "stable both-edges" },
                                                // 숫자 잘림/들쭉 해결
                                                '& .MuiMultiSectionDigitalClockSection-item': {
                                                    height: "40px",
                                                    lineHeight: '40px',
                                                    fontVariantNumeric: 'tabular-nums',
                                                },
                                                // (간혹 Dialog 기본 여백/마진 때문에 잘리는 경우)
                                                // '&.MuiDialog-paper': {
                                                //     margin: 2,               // 기본 16px (=2*8) 정도
                                                //     width: 360,              // 필요 시 고정폭
                                                // },
                                            },
                                        },
                                    }}
                                    slots = {{
                                        actionBar : (props) => (
                                            <PickersActionBar
                                                {...props}
                                                sx = {{"& .MuiButton-root:first-of-type" : {marginRight : "auto"}}}
                                            />
                                        )
                                    }}
                                    sx={{
                                        // 툴바/타이포 쪽 줄간격 초기화(글자 짤림 예방)
                                        '& .MuiPickersToolbar-root, & .MuiPickersToolbar-content, & .MuiTypography-root': {
                                            lineHeight: 1.4,
                                            letterSpacing: 0,
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </ThemeProvider>
                    </StyledEngineProvider>
                </Box>
                <Box sx = {{flex : 1}}>
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
            </Box>
            {/* 혈당 수치 */}
            <Box sx = {{marginBottom : "12px"}}>
                <Typography sx = {{marginLeft : "4px", marginBottom : "4px"}}>혈당 수치</Typography>
                <Input 
                    type = "text"
                    value = {sugar}
                    onChange = {(event) => { setSugar(event.target.value); }} 
                    placeholder = "혈당 수치"
                    startDecorator = {<WaterDrop sx = {{...iconColor}} />} 
                    sx = {{...inputFocusColor}}
                />
            </Box>
            <Button onClick = {createsugar} sx = {{...btnColor, marginTop : "12px"}}>추가하기</Button>
        </Box>
    );
}
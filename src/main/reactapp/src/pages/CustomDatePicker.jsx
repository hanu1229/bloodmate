import { createTheme, StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { PickersActionBar } from "@mui/x-date-pickers/PickersActionBar";
import { PickersCalendarHeader } from "@mui/x-date-pickers/PickersCalendarHeader";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function CustomDatePicker(porps) {

    dayjs.locale("ko");

    const theme = createTheme({
        components : {
            /** 선택한 날짜, 오늘 날짜 색상 조절 */
            MuiPickersDay : {
                styleOverrides : {
                    root : {
                        "&.Mui-selected" : {
                            backgroundColor : "#A097D4", color : "#fff",
                            "&:hover" : {backgroundColor : "#A097D4"},
                            "&:focus" : {backgroundColor : "#A097D4"}
                        },
                        "&.MuiPickersDay-today": {borderColor: "#A097D4"}
                    }
                }
            },
            /** TODAY, OK(ACCEPT), CANCEL 버튼 색상 조절 */
            MuiButton : {
                styleOverrides : {
                    root : {
                        "&.MuiButton-text" : {...btnColor},
                        "&.MuiButton-text:hover" : {borderColor : "#A097D4", color : "#FFFFFF"}
                    }
                }
            }
        },
    });

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme} >
                <LocalizationProvider dateAdapter = {AdapterDayjs} adapterLocale = "ko">
                    <MobileDateTimePicker
                        value = {date}
                        onChange = {(newValue) => setDate(newValue)}
                        format = "YYYY-MM-DD"
                        slotProps = {{
                            actionBar : {actions : ["today", "accept", "cancel"]},
                            toolbar : {toolbarFormat : "MM월 DD일"},
                            dialog: {
                                sx: {
                                    '.MuiPickersYear-yearButton.Mui-selected, .MuiPickersMonth-monthButton.Mui-selected': {
                                    backgroundColor: '#A097D4 !important',
                                    color: '#fff',
                                    },
                                    '.MuiPickersYear-yearButton.Mui-selected:hover, .MuiPickersYear-yearButton.Mui-selected.Mui-focusVisible, .MuiPickersMonth-monthButton.Mui-selected:hover, .MuiPickersMonth-monthButton.Mui-selected.Mui-focusVisible': {
                                    backgroundColor: '#A097D4 !important',
                                    },
                                },
                            },
                            mobilePaper: {
                                sx: {
                                    '.MuiPickersYear-yearButton.Mui-selected, .MuiPickersMonth-monthButton.Mui-selected': {
                                    backgroundColor: '#A097D4 !important',
                                    color: '#fff',
                                    },
                                    '.MuiPickersYear-yearButton.Mui-selected:hover, .MuiPickersYear-yearButton.Mui-selected.Mui-focusVisible, .MuiPickersMonth-monthButton.Mui-selected:hover, .MuiPickersMonth-monthButton.Mui-selected.Mui-focusVisible': {
                                    backgroundColor: '#A097D4 !important',
                                    },
                                    '[class*="YearCalendar"] button.Mui-selected, [class*="MonthCalendar"] button.Mui-selected': {
                                        backgroundColor: '#A097D4 !important',
                                        color: '#fff !important',
                                    }
                                },
                            },
                        }}
                        slots = {{
                            calendarHeader : (props) => {
                                const year = props.currentMonth.year();
                                const month = String(props.currentMonth.month() + 1).padStart(2, "0");
                                const label = `${year}년 ${month}월`;
                                return (
                                    <PickersCalendarHeader
                                        {...props}
                                        sx = {{
                                            "& .MuiPickersCalendarHeader-label" : {visibility : "hidden"},
                                            "& .MuiPickersCalendarHeader-switchViewButton": { display: "none" },
                                            "& .MuiPickersCalendarHeader-switchViewIcon":   { display: "none" },
                                            "& .MuiPickersCalendarHeader-labelContainer" : {
                                                position : "relative",
                                                paddingRight : "20px",
                                                alignItems : "center",
                                                width : "100%",
                                                "&::after" : {
                                                    content : JSON.stringify(label),
                                                    position : "absolute",
                                                    // left : 0,
                                                    // top : 12,
                                                    fontSize : "1rem",
                                                    fontWeight : "bold",
                                                    whiteSpace: 'nowrap',
                                                    pointerEvents: 'none',     // 클릭 방해 X
                                                    lineHeight: 1.6,           // 수직 정렬 보정(취향껏)
                                                    maxWidth: 'calc(100% - 20px)', // 화살표 영역 침범 방지
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }
                                            }
                                        }}
                                    />
                                );
                            },
                            actionBar : (props) => (
                                <PickersActionBar
                                    {...props}
                                    sx = {{"& .MuiButton-root:first-of-type" : {marginRight : "auto"}}}
                                />
                            )
                        }}
                        sx = {{
                            ...inputFocusColor,
                            height : "36px", maxHeight : "36px",
                            "& .MuiPickersOutlinedInput-root" : {
                                width : "180px", height : "100%"
                            },
                            '& .MuiPickersYear-yearButton.Mui-selected': {
                                backgroundColor: '#A097D4',
                                color: '#fff',
                            },
                            '& .MuiPickersMonth-monthButton.Mui-selected': {
                                backgroundColor: '#A097D4',
                                color: '#fff',
                            }
                        }}
                    ></MobileDateTimePicker>
                </LocalizationProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
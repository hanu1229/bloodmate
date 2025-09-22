import { Box, Button, IconButton, Typography } from "@mui/joy";
import useCustomNavigate from "../../useCustomNavigate";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverDomain } from "../../ApiDomain";
import { DataGrid, gridPaginatedVisibleSortedGridRowEntriesSelector, useGridApiRef } from "@mui/x-data-grid";
import { ArrowDropDown, ArrowDropUp, ArrowRight } from "@mui/icons-material";
import { LineChart } from "@mui/x-charts";

export default function BloodHba1cPage(props) {
const checkLogin = useCustomNavigate();

    const [hba1cInfo, sethba1cInfo] = useState([]);
    /** true : 펼침 | false : 닫힘 */
    const [hba1cGuide, setHba1cGuide] = useState(false);

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
                    <Box onClick = {() => {setHba1cGuide(!hba1cGuide);}} sx = {{display : "flex", alignItems : "center", "&:hover" : {cursor : "pointer", fontWeight : "bold"}}}>
                        {hba1cGuide ? <ArrowDropDown /> : <ArrowRight />}
                        <Typography sx = {{color : "inherit"}}>당화혈색소 수치 기준</Typography>
                    </Box>
                    <Box sx = {{display : "flex", flexDirection : "row", alignItems : "start", marginBottom : "16px", paddingLeft : "24px", width : "800px"}}>
                        {
                            hba1cGuide ? (<>
                                <Box sx = {{marginRight : "32px"}}>
                                    <Typography>
                                        <strong>- 지난 2 ~ 3개월 동안의 평균 혈당 수치를 반영합니다.</strong><br/>
                                        - 정상 : <strong>5.7% 미만</strong><br/>
                                        - 당뇨 전단계(공복혈당장애) : <strong>5.7% ~ 6.4%</strong><br/>
                                        - 당뇨병 : <strong>6.5% 이상</strong>
                                    </Typography>
                                </Box>
                            </>) : ""
                        }
                    </Box>
                </Box>
            </Box>
        </>
    );
}
import { Box, Button, IconButton, Typography } from "@mui/joy";
import useCustomNavigate from "../../useCustomNavigate";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverDomain } from "../../ApiDomain";
import { DataGrid, gridPaginatedVisibleSortedGridRowEntriesSelector, useGridApiRef } from "@mui/x-data-grid";
import { ArrowDropDown, ArrowDropUp, ArrowRight } from "@mui/icons-material";
import { LineChart } from "@mui/x-charts";

export default function BloodPressurePage(props) {
    const checkLogin = useCustomNavigate();

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
                    <Typography>혈압</Typography>
                    <Box onClick = {() => {setSugarGuide(!sugarGuide);}} sx = {{display : "flex", alignItems : "center", "&:hover" : {cursor : "pointer", fontWeight : "bold"}}}>
                        {sugarGuide ? <ArrowDropDown /> : <ArrowRight />}
                        <Typography sx = {{color : "inherit"}}>혈당 수치 기준</Typography>
                    </Box>
                    <Box sx = {{display : "flex", flexDirection : "row", alignItems : "start", marginBottom : "16px", paddingLeft : "24px", width : "800px"}}>
                        {
                            sugarGuide ? (<>
                                <Box sx = {{marginRight : "32px"}}>
                                    <Typography>
                                        <strong>공복</strong><br/>
                                        - 정상 : <strong>70 ~ 100mg/dL</strong><br/>
                                        - 당뇨 전단계(공복혈당장애) : <strong>100 ~ 125mg/dL</strong><br/>
                                        - 당뇨병 : <strong>126mg/dL 이상</strong>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography>
                                        <strong>식후 2시간</strong><br/>
                                        - 정상 : <strong>90 ~ 140mg/dL</strong><br/>
                                        - 당뇨 전단계(공복혈당장애) : <strong>140 ~ 199mg/dL</strong><br/>
                                        - 당뇨병 : <strong>200mg/dL 이상</strong><br/>
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
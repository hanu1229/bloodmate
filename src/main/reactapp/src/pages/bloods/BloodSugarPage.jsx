import { Box, Button, IconButton, Typography } from "@mui/joy";
import useCustomNavigate from "../../useCustomNavigate";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverDomain } from "../../ApiDomain";
import { DataGrid } from "@mui/x-data-grid";
import { ArrowDropDown, ArrowDropUp, ArrowRight } from "@mui/icons-material";
import { LineChart } from "@mui/x-charts";

export default function BloodSugarPage(props) {

    const checkLogin = useCustomNavigate();

    const [bloodSugarInfo, setBloodSugarInfo] = useState([]);
    /** true : 펼침 | false : 닫힘 */
    const [sugarGuide, setSugarGuide] = useState(false);
    

    useEffect(() => { checkLogin(); findAll(); }, []);

    const findAll = async () => {
        const token = localStorage.getItem("Token");
        const response = await axios.get(`${serverDomain}/blood/sugar`, {headers : {Authorization : token}});
        console.log(response.data);
        const temp = response.data.map((item, index) => {
            const time = item["measuredAt"].split("T")[1];
            const [hour, minute, second] = time.split(":");

            const obj = {
                id : index + 1,
                measureDate : item["measuredAt"].split("T")[0].replaceAll("-", "."),
                measureTime : `${hour}시${minute}분`,
                contextLabel : item["measurementContextLabel"],
                value : item["bloodSugarValue"],
            }
            return obj;
        });
        console.log("temp");
        console.log(temp);
        setBloodSugarInfo(temp);
    }


    const columns = [
        { 
            field: "measureDate", 
            headerName: "측정일", 
            // width: 120, 
            flex : 1,
            headerAlign : "center",
            align : "center", 
            sortable: false, 
            disableColumnMenu : true,
        },
        {
            field: "measureTime",
            headerName: "측정 시간",
            // width: 150,
            flex : 1,
            headerAlign : "center",
            align : "center", 
            editable: true,
            sortable: false,
            disableColumnMenu : true,
        },
        {
            field: "contextLabel",
            headerName: "측정 상황",
            // width: 150,
            flex : 1,
            headerAlign : "center",
            align : "center", 
            editable: true,
            sortable: false,
            disableColumnMenu : true,
        },
        {
            field: "value",
            headerName: "측정값(혈당값)",
            type: 'number',
            // width: 110,
            flex : 1,
            headerAlign : "center",
            align : "center", 
            editable: true,
            sortable: false,
            disableColumnMenu : true,
        },
    ];

    const rows = [
        { id : 1, measureDate: 1, measureTime: 'Jon', contextLabel: 'Snow', value: 14 },
        { id : 2, measureDate: 2, measureTime: 'Cersei', contextLabel: 'Lannister', value: 31 },
        { id : 3, measureDate: 3, measureTime: 'Jaime', contextLabel: 'Lannister', value: 31 },
        { id : 4, measureDate: 4, measureTime: 'Arya', contextLabel: 'Stark', value: 11 },
        { id : 5, measureDate: 5, measureTime: 'Daenerys', contextLabel: 'Targaryen', value: null },
        { id : 6, measureDate: 6, measureTime: null, contextLabel: 'Melisandre', value: 150 },
        { id : 7, measureDate: 7, measureTime: 'Ferrara', contextLabel: 'Clifford', value: 44 },
        { id : 8, measureDate: 8, measureTime: 'Rossini', contextLabel: 'Frances', value: 36 },
        { id : 9, measureDate: 9, measureTime: 'Harvey', contextLabel: 'Roxie', value: 65 },
    ];

    return (
        <>
            <Box sx = {{boxSizing : "border-box", padding : "24px", backgroundColor : "inherit", width : "100%"}}>
                <Box sx = {{display : "flex", flexDirection : "column", minHeight : 0}}>
                    {/* <Typography>혈당</Typography> */}
                    {/* <Typography>{JSON.stringify(bloodSugarInfo)}</Typography> */}
                    {/* <Box sx = {{height : "32px"}}></Box> */}
                    {/* <Box sx = {{height : "320px"}}></Box> */}
                    {/* <Box sx = {{height : "32px"}}></Box> */}
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
                    <Box sx = {{display : "flex", width : "100%", height : "481px", alignItems : "start"}}>
                        <DataGrid
                            rows = {bloodSugarInfo}
                            columns = {columns}
                            rowHeight = {40}
                            columnHeaderHeight = {40}
                            initialState = {{
                                pagination : {
                                    paginationModel : {pageSize : 10},
                                }
                            }}
                            pageSizeOptions = {[5]}
                            // checkboxSelection
                            disableRowSelectionOnClick
                            sx = {{
                                boxSizing : "border-box",
                                height : "100%",
                                marginRight : "30px",
                                border : "0px solid black",
                                "& .MuiDataGrid-footerContainer" : {maxHeight : "40px", minHeight : "40px"},
                                ".MuiToolbar-root" : {maxHeight : "40px", minHeight : "40px"}
                            }}
                        />
                        <Box sx = {{flex : 1, height : "100%", border : "1px solid black", backgroundColor  : "#FFFFFF"}}>
                            <LineChart
                                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                series={[
                                    {
                                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                                    },
                                ]}
                                // width={500}
                                // height={300}
                                sx = {{flex : 1, height : "inherit", border : "1px solid black", backgroundColor  : "#FFFFFF"}}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>

        </>
    );
}
import { Box, Button, Typography } from "@mui/joy";
import useCustomNavigate from "../../useCustomNavigate";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverDomain } from "../../ApiDomain";
import { DataGrid } from "@mui/x-data-grid";
import { ArrowDropDown, ArrowDropUp, ArrowRight } from "@mui/icons-material";
import { LineChart } from "@mui/x-charts";
import { CustomModal } from "../modals/CustomModal";
import { btnColor } from "../../styles/commonStyle";
import UpdatePressureModal from "../modals/blood/pressure/UpdatePressureModal";
import DeletePressureModal from "../modals/blood/pressure/DeletePressureModal";
import CreatePressureModal from "../modals/blood/pressure/CreatePressureModal";

export default function BloodPressurePage(props) {
    const checkLogin = useCustomNavigate();

    const [bloodPressureInfo, setBloodPressureInfo] = useState([]);
    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [rowInfo, setRowInfo] = useState({});
    /** true : 펼침 | false : 닫힘 */
    const [sugarGuide, setSugarGuide] = useState(false);

    useEffect(() => { checkLogin(); findAll(); }, []);

    const findAll = async () => {
        const token = localStorage.getItem("Token");
        const response = await axios.get(`${serverDomain}/blood/pressure`, {headers : {Authorization : token}});
        console.log(response.data);
        const temp = response.data.map((item, index) => {
            const time = item["measuredAt"].split("T")[1];
            const [hour, minute, second] = time.split(":");

            const obj = {
                id : index + 1,
                measureDate : item["measuredAt"].split("T")[0],
                measureTime : `${hour}:${minute}`,
                contextLabel : item["measurementContextLabel"],
                contextId : item["measurementContextId"],
                systolicValue : item["bloodPressureSystolic"],
                diastolicValue : item["bloodPressureDiastolic"],
                pulseValue : item["bloodPressurePulse"],
                bloodPressureId : item["bloodPressureId"]
            }
            return obj;
        });
        console.log("temp");
        console.log(temp);
        setBloodPressureInfo(temp);
    }

     const columns = [
        { 
            field: "measureDate", 
            headerName: "측정일", 
            flex : 1,
            headerAlign : "center",
            align : "center", 
            sortable: false, 
            disableColumnMenu : true,
        },
        {
            field: "measureTime",
            headerName: "측정 시간",
            flex : 1,
            headerAlign : "center",
            align : "center", 
            editable: false,
            sortable: false,
            disableColumnMenu : true,
        },
        {
            field: "contextLabel",
            headerName: "측정 상황",
            flex : 1,
            headerAlign : "center",
            align : "center", 
            editable: false,
            sortable: false,
            disableColumnMenu : true,
        },
        {
            field: "systolicValue",
            headerName: "수축 수치",
            type: 'number',
            flex : 1,
            headerAlign : "center",
            align : "center", 
            editable: false,
            sortable: false,
            disableColumnMenu : true,
        },
        {
            field: "diastolicValue",
            headerName: "이완 수치",
            type: 'number',
            flex : 1,
            headerAlign : "center",
            align : "center", 
            editable: false,
            sortable: false,
            disableColumnMenu : true,
        },
        {
            field: "pulseValue",
            headerName: "맥박 수치",
            type: 'number',
            flex : 1,
            headerAlign : "center",
            align : "center", 
            editable: false,
            sortable: false,
            disableColumnMenu : true,
        },
        {
            field: "put",
            headerName: "수정",
            width : 80,
            headerAlign : "center",
            align : "center", 
            editable: false,
            sortable: false,
            disableColumnMenu : true,
            renderCell: (params) => (
                <Button
                    onClick={(event) => { 
                        event.stopPropagation(); 
                        console.log("수정하기"); 
                        setRowInfo(params.row);
                        setUpdateModal(true);
                    }}
                    sx = {{...btnColor}}
                >
                    수정
                </Button>
            )
        },
        {
            field: "delete",
            headerName: "삭제",
            width : 80,
            headerAlign : "center",
            align : "center", 
            editable: false,
            sortable: false,
            disableColumnMenu : true,
            renderCell: (params) => (
                <Button
                    onClick={(event) => {
                        event.stopPropagation(); 
                        console.log("삭제하기"); 
                        setRowInfo(params.row);
                        setDeleteModal(true);
                    }}
                    sx = {{...btnColor}}
                >
                    삭제
                </Button>
            ),
        },
    ];

    return (
        <>
            <Box sx = {{boxSizing : "border-box", padding : "40px", backgroundColor : "inherit", width : "100%"}}>
                <Box sx = {{display : "flex", flexDirection : "column", minHeight : 0}}>
                    {/* <Box sx = {{height : "320px"}}></Box> */}
                    {/* 가이드 */}
                    <Box onClick = {() => {setSugarGuide(!sugarGuide);}} sx = {{display : "flex", alignItems : "center", "&:hover" : {cursor : "pointer", fontWeight : "bold"}}}>
                        {sugarGuide ? <ArrowDropDown /> : <ArrowRight />}
                        <Typography sx = {{color : "inherit"}}>혈압 수치 기준</Typography>
                    </Box>
                    <Box sx = {{margin : "16px 0px", paddingLeft : "24px", width : "600px"}}>
                        {
                            sugarGuide ? (<>
                                <table style = {{width : "600px", background : "#FFFFFF", textAlign : "center", borderCollapse : "collapse"}}>
                                    <thead>
                                        <tr style = {{height : "40px", borderBottom : "1px solid #969696"}}>
                                            <th></th><th>수축기(mmHg)</th><th>이완기(mmHg)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style = {{height : "40px", borderBottom : "1px solid #969696"}}>
                                            <td>정상</td><td>120mmHg 미만</td><td>80mmHg 미만</td>
                                        </tr>
                                        <tr style = {{height : "40px", borderBottom : "1px solid #969696"}}>
                                            <td>고혈압 전단계</td><td>120 ~ 139mmHg 미만</td><td>80 ~ 89mmHg 미만</td>
                                        </tr>
                                        <tr style = {{height : "40px", borderBottom : "1px solid #969696"}}>
                                            <td>경도 고혈압</td><td>140 ~ 159mmHg 미만</td><td>90 ~ 99mmHg 미만</td>
                                        </tr>
                                        <tr style = {{height : "40px", borderBottom : "1px solid #969696"}}>
                                            <td>중증도 이상 고혈압</td><td>160mmHg 미만</td><td>100mmHg 미만</td>
                                        </tr>
                                        <tr style = {{height : "40px", borderBottom : "1px solid #969696"}}>
                                            <td>저혈압</td><td>100mmHg 미만</td><td>60mmHg 미만</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>) : ""
                        }
                    </Box>
                    {/* 추가하기 버튼 */}
                    <Box sx = {{marginBottom : "8px", display : "flex", justifyContent : "end"}}>
                        <Button onClick = {() => setCreateModal(true)} sx = {{...btnColor}}>추가하기</Button>
                        <CustomModal
                            open = {createModal}
                            onClose = {(event, reason) => { reason === "backdropClick" ? setCreateModal(true) : setCreateModal(false) }}
                            title = "혈압 수치 추가하기"
                        >
                            <CreatePressureModal findAll = {findAll} onClose = {() => {setCreateModal(false);}} />
                        </CustomModal>
                    </Box>
                    {/* 모달 */}
                    <CustomModal
                        open = {updateModal}
                        onClose = {(event, reason) => { reason === "backdropClick" ? setUpdateModal(true) : setUpdateModal(false) }}
                        title = "혈압 수치 수정하기"
                    >
                        <UpdatePressureModal rowInfo = {rowInfo} findAll = {findAll} onClose = {() => {setUpdateModal(false);}} />
                    </CustomModal>
                    <CustomModal
                        open = {deleteModal}
                        onClose = {(event, reason) => { reason === "backdropClick" ? setDeleteModal(true) : setDeleteModal(false) }}
                        title = "혈압 수치 삭제하기"
                    >
                        <DeletePressureModal rowInfo = {rowInfo} findAll = {findAll} onClose = {() => {setDeleteModal(false);}} />
                    </CustomModal>
                    {/* 표 */}
                    <Box sx = {{display : "flex", width : "100%", height : "484px", alignItems : "start"}}>
                        <DataGrid
                            // apiRef = {apiRef}
                            rows = {bloodPressureInfo}
                            columns = {columns}
                            rowHeight = {40}
                            columnHeaderHeight = {40}
                            initialState = {{
                                pagination : {
                                    paginationModel : {pageSize : 10},
                                }
                            }}
                            pageSizeOptions = {[10]}
                            // checkboxSelection
                            disableRowSelectionOnClick
                            sx = {{
                                boxSizing : "border-box",
                                height : "100%",
                                // marginRight : "30px",
                                border : "2px solid #e0e0e0",
                                borderRadius : 0,
                                "& .MuiDataGrid-footerContainer" : {maxHeight : "40px", minHeight : "40px"},
                                ".MuiToolbar-root" : {maxHeight : "40px", minHeight : "40px"}
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
}
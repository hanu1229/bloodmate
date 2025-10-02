import { Box, Button, Typography } from "@mui/joy";
import useCustomNavigate from "../../useCustomNavigate";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverDomain } from "../../ApiDomain";
import { DataGrid } from "@mui/x-data-grid";
import { ArrowDropDown, ArrowDropUp, ArrowRight, Edit } from "@mui/icons-material";
import { LineChart } from "@mui/x-charts";
import { btnColor } from "../../styles/commonStyle";
import { CustomModal } from "../modals/CustomModal";
import CreateHba1cModal from "../modals/blood/hba1c/CreateHba1cModal";
import UpdateHba1cModal from "../modals/blood/hba1c/UpdateHba1cModal";
import DeleteHba1cModal from "../modals/blood/hba1c/DeleteHba1cModal";

export default function BloodSugarPage(props) {

    const checkLogin = useCustomNavigate();

    const [hba1cInfo, setHba1cInfo] = useState([]);
    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [rowInfo, setRowInfo] = useState({});
    /** true : 펼침 | false : 닫힘 */
    const [hba1cGuide, setHba1cGuide] = useState(false);
    /** 차트에 필요 - DataGrid를 조작할 수 있게 해줌 */
    /*
    const apiRef = useGridApiRef();
    const [currentPageRows, setCurrentPageRows] = useState([]);
    const [measureDates, setMeasureDates] = useState([]);
    */
    
    useEffect(() => { checkLogin(); findAll(); }, []);
    /** 차트에 필요 */

    const findAll = async () => {
        const token = localStorage.getItem("Token");
        const response = await axios.get(`${serverDomain}/blood/hba1c`, {headers : {Authorization : token}});
        console.log(response.data);
        const temp = response.data.map((item, index) => {
            const time = item["measuredAt"].split("T")[1];
            const [hour, minute, second] = time.split(":");
            const [testDate, testTime] = item["nextTestAt"].split("T");

            const obj = {
                id : index + 1,
                measureDate : item["measuredAt"].split("T")[0],
                measureTime : `${hour}:${minute}`,
                nextTestAt : testTime === "00:00:00" ? testDate : item["nextTestAt"],
                hba1cValue : item["hba1cValue"],
                hba1cId : item["hba1cId"]
            }
            return obj;
        });
        console.log("temp");
        console.log(temp);
        setHba1cInfo(temp);
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
            field: "hba1cValue",
            headerName: "측정값(당화혈색소)",
            type: 'number',
            flex : 1,
            headerAlign : "center",
            align : "center", 
            editable: false,
            sortable: false,
            disableColumnMenu : true,
        },
        {
            field: "nextTestAt",
            headerName: "검사 예정일",
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

    /*
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
    */

    return (
        <>
            <Box sx = {{boxSizing : "border-box", padding : "40px", backgroundColor : "inherit", width : "100%"}}>
                <Box sx = {{display : "flex", flexDirection : "column", minHeight : 0}}>
                    {/* <Box sx = {{height : "320px"}}></Box> */}
                    {/* 가이드 */}
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
                    {/* 추가하기 버튼 */}
                    <Box sx = {{marginBottom : "8px", display : "flex", justifyContent : "end"}}>
                        <Button onClick = {() => setCreateModal(true)} sx = {{...btnColor}}>작성하기</Button>
                        <CustomModal
                            open = {createModal}
                            onClose = {(event, reason) => { reason === "backdropClick" ? setCreateModal(true) : setCreateModal(false) }}
                            title = "당화혈색소 수치 추가하기"
                        >
                            <CreateHba1cModal findAll = {findAll} onClose = {() => {setCreateModal(false);}} />
                        </CustomModal>
                    </Box>
                    {/* 모달 */}
                    <CustomModal
                        open = {updateModal}
                        onClose = {(event, reason) => { reason === "backdropClick" ? setUpdateModal(true) : setUpdateModal(false) }}
                        title = "당화혈색소 수치 수정하기"
                    >
                        <UpdateHba1cModal rowInfo = {rowInfo} findAll = {findAll} onClose = {() => {setUpdateModal(false);}} />
                    </CustomModal>
                    <CustomModal
                        open = {deleteModal}
                        onClose = {(event, reason) => { reason === "backdropClick" ? setDeleteModal(true) : setDeleteModal(false) }}
                        title = "당화혈색소 수치 삭제하기"
                    >
                        <DeleteHba1cModal rowInfo = {rowInfo} findAll = {findAll} onClose = {() => {setDeleteModal(false);}} />
                    </CustomModal>
                    {/* 표 */}
                    <Box sx = {{display : "flex", width : "100%", height : "484px", alignItems : "start"}}>
                        <DataGrid
                            // apiRef = {apiRef}
                            rows = {hba1cInfo}
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
                        {/* <Box sx = {{flex : 1, height : "484px", backgroundColor  : "#FFFFFF"}}>
                            <LineChart
                                xAxis={[
                                    { 
                                        scaleType : "band",
                                        data: [...measureDates]
                                        // data: ["2025-08-15", 2, 3, 5, 8, 10]
                                    }
                                ]}
                                series={[
                                    {
                                    // data: [168, 5.5, 2, 8.5, 1.5, 5],
                                    data: [168, 5.5, 2, 8.5, 1.5, 5],
                                    },
                                ]}
                                // width={500}
                                // height={300}
                                sx = {{
                                    flex : 1, 
                                    boxSizing : "border-box", 
                                    height : "inherit", 
                                    border : "2px solid #e0e0e0", 
                                    backgroundColor  : "#FFFFFF",
                                }}
                            />
                        </Box> */}
                    </Box>
                </Box>
            </Box>

        </>
    );
}
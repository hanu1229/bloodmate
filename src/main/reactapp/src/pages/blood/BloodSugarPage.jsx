import { Box, Button, IconButton, Typography } from "@mui/joy";
import useCustomNavigate from "../../useCustomNavigate";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverDomain } from "../../ApiDomain";
import { DataGrid, GridActionsCellItem, gridPaginatedVisibleSortedGridRowEntriesSelector, useGridApiRef } from "@mui/x-data-grid";
import { ArrowDropDown, ArrowDropUp, ArrowRight, Edit } from "@mui/icons-material";
import { LineChart } from "@mui/x-charts";
import { btnColor } from "../../styles/commonStyle";
import { CustomModal } from "../modals/CustomModal";
import CreateSugarModal from "../modals/blood/sugar/CreateSugarModal";
import UpdateSugarModal from "../modals/blood/sugar/UpdateSugarModal";
import DeleteSugarModal from "../modals/blood/sugar/DeleteSugarModal";
import SearchSugarModal from "../modals/blood/sugar/SearchSugarModal";

export default function BloodSugarPage(props) {

    const checkLogin = useCustomNavigate();

    const [bloodSugarInfo, setBloodSugarInfo] = useState([]);
    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [searchModal, setSearchModal] = useState(false);
    const [rowInfo, setRowInfo] = useState({});
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [paginationModel, setPaginationModel] = useState({page : 0, pageSize : 7});
    /** true : 펼침 | false : 닫힘 */
    const [sugarGuide, setSugarGuide] = useState(false);
    /** 차트에 필요 - DataGrid를 조작할 수 있게 해줌 */
    /*
    const apiRef = useGridApiRef();
    const [currentPageRows, setCurrentPageRows] = useState([]);
    const [measureDates, setMeasureDates] = useState([]);
    */
    
    useEffect(() => { 
        (async () => {
            await checkLogin(); 
            await findAll(); 
            console.log(paginationModel.pageSize);
        })();
    }, [paginationModel]);
    /** 차트에 필요 */
    /*
    useEffect(() => {
        if(!apiRef.current) { return; }

        const update = () => {
            // 현재 페이지에 들어가는 행들의 목록을 보여줌
            const entries = gridPaginatedVisibleSortedGridRowEntriesSelector(apiRef);
            const models = [...entries].reverse().map(entry => entry.model);
            setCurrentPageRows(models);
            const dates = [...models].map(model => model.measureDate);
            setMeasureDates(dates);
            console.log('현재 페이지 entries:', entries);
            console.table(models);
            console.table(dates);
        };

        // 초기 1회
        update();
        // 페이지/정렬/필터/행 변경 시 재계산
        const off1 = apiRef.current.subscribeEvent('paginationModelChange', update);
        const off2 = apiRef.current.subscribeEvent('sortModelChange', update);
        const off3 = apiRef.current.subscribeEvent('filterModelChange', update);
        const off4 = apiRef.current.subscribeEvent('rowsSet', update);

        return () => { off1(); off2(); off3(); off4(); };
        
    }, [apiRef, bloodSugarInfo]);
    */

    const findAll = async () => {
        try {
            const token = localStorage.getItem("Token");
            const response = await axios.get(
                `${serverDomain}/blood/sugar`, 
                {
                    headers : {Authorization : token},
                    params : {page : paginationModel.page + 1, size : paginationModel.pageSize, sorting : "DESC"}
                }
            );
            if(response.status === 200) {
                console.log(response.data);
                const temp = response.data.content.map((item, index) => {
                    const time = item["measuredAt"].split("T")[1];
                    const [hour, minute, second] = time.split(":");
        
                    const obj = {
                        id : index + 1,
                        measureDate : item["measuredAt"].split("T")[0],
                        measureTime : `${hour}:${minute}`,
                        contextLabel : item["measurementContextLabel"],
                        contextId : item["measurementContextId"],
                        value : item["bloodSugarValue"],
                        bloodSugarId : item["bloodSugarId"]
                    }
                    return obj;
                });
                console.log("temp");
                console.log(temp);
                setBloodSugarInfo(temp);
                setTotalElements(response.data.totalElements);
                setTotalPages(response.data.totalPages);
            }
        } catch(e) {
            if(e.response.status === 400) {
                alert("데이터가 존재하지 않습니다");
            }
        }
    }

    /** 검색하기 */
    const findData = async () => {
        try {
            const token = localStorage.getItem("Token");
            let params = {page : paginationModel.page + 1, size : paginationModel.pageSize, sorting : "DESC"};
            if(startDate == "" || endDate == "") {
                params = {...params, context : context};
            }
            if(context === 0) {
                params = {...params, startDate : startDate, endDate : endDate};
            }
            const response = await axios.get(
                `${serverDomain}/blood/sugar/date`,
                {
                    withCredentials : true,
                    headers : {Authorization : token},
                    params : params
                }
            )
            if(response.status === 200) { 
                const temp = response.data.content.map((item, index) => {
                    const time = item["measuredAt"].split("T")[1];
                    const [hour, minute, second] = time.split(":");
        
                    const obj = {
                        id : index + 1,
                        measureDate : item["measuredAt"].split("T")[0],
                        measureTime : `${hour}:${minute}`,
                        contextLabel : item["measurementContextLabel"],
                        contextId : item["measurementContextId"],
                        value : item["bloodSugarValue"],
                        bloodSugarId : item["bloodSugarId"]
                    }
                    return obj;
                });
                console.log("temp");
                console.log(temp);
                setBloodSugarInfo(temp);
                setTotalElements(response.data.totalElements);
                setTotalPages(response.data.totalPages);
             }
        } catch(e) {
            if(e.response.status === 400) { 
                alert("데이터가 존재하지 않습니다"); 
            }
        }
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
            field: "value",
            headerName: "측정값(혈당값)",
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

                    {/* 작성하기 버튼 */}
                    <Box sx = {{marginBottom : "8px", display : "flex", justifyContent : "end"}}>
                        <Button onClick = {() => setSearchModal(true)} sx = {{...btnColor, marginRight : "16px"}}>조건 검색</Button>
                        <Button onClick = {() => setCreateModal(true)} sx = {{...btnColor}}>작성하기</Button>
                        <CustomModal
                            open = {createModal}
                            onClose = {(event, reason) => { reason === "backdropClick" ? setCreateModal(true) : setCreateModal(false) }}
                            title = "혈당 수치 작성하기"
                            isInfo = {true}
                        >
                            <CreateSugarModal findAll = {findAll} onClose = {() => {setCreateModal(false);}} />
                        </CustomModal>
                    </Box>
                    {/* 모달 */}
                    <CustomModal
                        open = {searchModal}
                        onClose = {(event, reason) => { reason === "backdropClick" ? setSearchModal(true) : setSearchModal(false) }}
                        title = "조건 검색하기"
                        isInfo = {false}
                    >
                        <SearchSugarModal findAll = {findData} onClose = {() => {setSearchModal(false);}}  />
                    </CustomModal>
                    <CustomModal
                        open = {updateModal}
                        onClose = {(event, reason) => { reason === "backdropClick" ? setUpdateModal(true) : setUpdateModal(false) }}
                        title = "혈당 수치 수정하기"
                        isInfo = {true}
                    >
                        <UpdateSugarModal rowInfo = {rowInfo} findAll = {findAll} onClose = {() => {setUpdateModal(false);}} />
                    </CustomModal>
                    <CustomModal
                        open = {deleteModal}
                        onClose = {(event, reason) => { reason === "backdropClick" ? setDeleteModal(true) : setDeleteModal(false) }}
                        title = "혈당 수치 삭제하기"
                        isInfo = {true}
                    >
                        <DeleteSugarModal rowInfo = {rowInfo} findAll = {findAll} onClose = {() => {setDeleteModal(false);}} />
                    </CustomModal>
                    {/* 표 */}
                    <Box sx = {{display : "flex", width : "100%", height : `${56 + 52 * paginationModel.pageSize + 56 + 2.5}px`, alignItems : "start"}}>
                        <DataGrid
                            rows = {bloodSugarInfo}
                            columns = {columns}
                            // rowHeight = {40}
                            // columnHeaderHeight = {40}
                            rowCount = {totalElements}
                            // ↓ 서버에서 페이징한 값을 사용하기 위한 설정
                            pagination
                            paginationMode = "server"
                            paginationModel = {paginationModel}
                            onPaginationModelChange = {setPaginationModel}
                            sortingMode = "server"
                            // ↑ 서버에서 페이징한 값을 사용하기 위한 설정
                            pageSizeOptions = {[5, 7, 10]}
                            disableRowSelectionOnClick
                            sx = {{
                                boxSizing : "border-box",
                                height : "100%",
                                border : "1px solid #e0e0e0",
                                borderRadius : 0,
                                "& .MuiDataGrid-footerContainer" : {maxHeight : "56px", minHeight : "56px"},
                                ".MuiToolbar-root" : {maxHeight : "56px", minHeight : "56px"}
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
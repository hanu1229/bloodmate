import { Box, Typography } from "@mui/joy";
import useCustomNavigate from "../../useCustomNavigate";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverDomain } from "../../ApiDomain";
import { DataGrid } from "@mui/x-data-grid";

export default function BloodSugarPage(props) {

    const checkLogin = useCustomNavigate();

    useEffect(() => { checkLogin(); test(); }, []);

    const [testText, setTestText] = useState({});

    const test = async () => {
        const token = localStorage.getItem("Token");
        const response = await axios.get(`${serverDomain}/blood/sugar`, {headers : {Authorization : token}});
        console.log(response.data);
        setTestText(response.data);
    }

    const columns = [
        { 
            field: 'id', 
            headerName: '측정일', 
            width: 90, 
            headerAlign : "center",
            align : "center", 
            sortable: false, 
        },
        {
            field: 'firstName',
            headerName: '측정 시간',
            width: 150,
            headerAlign : "center",
            align : "center", 
            editable: true,
            sortable: false,
            disableColumnMenu : true,
        },
        {
            field: 'lastName',
            headerName: '측정 상황',
            width: 150,
            headerAlign : "center",
            align : "center", 
            editable: true,
            sortable: false,
            disableColumnMenu : true,
        },
        {
            field: 'age',
            headerName: '측정값(혈당값)',
            type: 'number',
            width: 110,
            headerAlign : "center",
            align : "center", 
            editable: true,
            sortable: false,
            disableColumnMenu : true,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
    
    return (
        <>
            <Box sx = {{boxSizing: "border-box", padding : "20px", height : "100%",  backgroundColor : "#f6f6f6"}}>
                <Box sx = {{display : "flex", flexDirection : "column"}}>
                    <Typography>혈당</Typography>
                    <Typography>{JSON.stringify(testText)}</Typography>
                    <DataGrid
                        rows = {rows}
                        columns = {columns}
                        initialState = {{
                            pagination : {
                                paginationModel : {pageSize : 5}
                            }
                        }}
                        pageSizeOptions = {[5]}
                        // checkboxSelection
                        disableRowSelectionOnClick
                        sx = {{
                        }}
                    />
                </Box>
            </Box>

        </>
    );
}
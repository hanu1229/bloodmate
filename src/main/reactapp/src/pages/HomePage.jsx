import { Box, Button, Divider, List, ListItem, Option, Select, Table, Typography } from "@mui/joy";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { serverDomain } from "../ApiDomain";
import { useEffect, useState } from "react";
import { btnColor } from "../styles/commonStyle";

export default function HomePage(props) {

    const navigate = useNavigate();
    // 로그인 여부 확인(Header.jsx)
    const {loginState, setLoginState} = useOutletContext();

    // 공지 관련 정보
    const [notices, setNotices] = useState([]);
    // 당화혈색소 관련 정보 | 타입 : {}
    const [hba1cData, setHba1cData] = useState(null);
    // 혈당 관련 정보 | 타입 : {}
    const [sugarData, setSugarData] = useState(null);
    // 혈압 관련 정보 | 타입 : {}
    const [pressureData, setPressureData] = useState(null);
    // 혈당 측정 상황 리스트 | 타입 : []
    const [sugarContext, setSugarContext] = useState([]);
    // 혈압 측정 상황 리스트 | 타입 : []
    const [pressureContext, setPressureContext] = useState([]);
    // 선택한 혈당 측정 상황 값 | 타입 : String
    const [selectSugarContext, setSelectSugarContext] = useState("아침 식전");
    // 선택한 혈압 측정 상황 값 | 타입 : String
    const [selectPressureContext, setSelectPressureContext] = useState("아침 식전");
    // 로그인 확인
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        findAllNotice();
        checkLogin();
    }, [loginState]);

    /** 모든 공지사항 가져오기 */
    const findAllNotice = async () => {
        try {
            const response = await axios.get(`${serverDomain}/board/category/공지`, {withCredentials : true});
            if(response.status === 200) {
                console.log(response.data);
                setNotices(response.data);
            }
        } catch(e) {
            if(e.response.status === 400) {
                alert("정보를 가져오는데 실패했습니다.");
            }
        }
    }

    /** 측정 상황 불러오기 */
    const readContext = async () => {
        try {
            const response = await axios.get(`${serverDomain}/blood/measurement`);
            if(response.status === 200) {
                console.table(response.data);
                setSugarContext(response.data);
                setPressureContext(response.data);
            }
        } catch(e) {
            if(e.response.status === 400) { console.log(response.data); }
        }
    }

    /** 로그인 여부 */
    const checkLogin = async () => {
        try {
            const token = localStorage.getItem("Token");
            if(token == null) {
                setIsLogin(false);
                return false;
            } else {
                setIsLogin(true);
                readContext();
                findHba1cLatest();
                findSugarAverage();
                findPressureAverage();
                return true;
            }
        } catch(e) {

        }
    }

    /** 당화혈색소 최근 1개 정보 불러오기 */
    const findHba1cLatest = async () => {
        try {
            const token = localStorage.getItem("Token");
            const response = await axios.get(`${serverDomain}/blood/hba1c/latest`, {withCredentials : true, headers : {Authorization : token}});
            if(response.status === 200) {
                console.log(response.data);
                setHba1cData(response.data);
            }
        } catch(e) {
            if(e.response.status === 400) {

            }
        }
    }

    //** 혈당 최소, 최대, 평균 불러오기 */
    const findSugarAverage = async () => {
        try {
            const token = localStorage.getItem("Token");
            const response = await axios.get(
                `${serverDomain}/blood/sugar/average`, 
                {
                    withCredentials : true, 
                    headers : {Authorization : token},
                    params : {measurementContextLabel : selectSugarContext},
                }
            );
            if(response.status === 200) {
                console.log(response.data);
                setSugarData(response.data);
            }
        } catch(e) {
            if(e.response.status === 400) {

            }
        }
    }

    // 혈압 최소, 최대, 평균 불러오기
    const findPressureAverage = async () => {
        try {
            const token = localStorage.getItem("Token");
            const response = await axios.get(
                `${serverDomain}/blood/pressure/average`, 
                {
                    withCredentials : true, 
                    headers : {Authorization : token},
                    params : {measurementContextLabel : selectPressureContext},
                }
            );
            if(response.status === 200) {
                console.log(response.data);
                setPressureData(response.data);
            }
        } catch(e) {
            if(e.response.status === 400) {

            }
        }
    }

    return (
        <>
            <Box sx = {{boxSizing : "border-box", padding : "40px", backgroundColor : "inherit", width : "100%"}}>
                <Box sx = {{borderTop : "1px solid black", backgroundColor : "#FFFFFF"}}>
                    <Box 
                        sx = {{
                            position: "sticky",
                            top: 0,
                            zIndex: 10,
                            backgroundColor : "#FFFFFF"
                        }}
                    >
                        <List sx = {{padding : "0px", display : "flex", alignItems : "start", borderBottom : "1px solid black"}}>
                            <ListItem 
                                sx = {{
                                    display : "flex", justifyContent : "space-between", 
                                    width : "100%", height : "48px",
                                    textAlign : "center", borderBottom : "1px solid black"
                                }}
                            >
                                <ListItemText 
                                    primary = "분류" 
                                    sx = {{width : "4%", maxWidth : "4%", "& span" : {fontWeight : "bold"}}} />
                                <ListItemText 
                                    primary = "제목" 
                                    sx = {{ "& span" : {fontWeight : "bold"}}} />
                                <ListItemText 
                                    primary = "작성자" 
                                    sx = {{width : "12%", maxWidth : "12%", "& span" : {fontWeight : "bold"}}} />
                                <ListItemText 
                                    primary = "작성일" 
                                    sx = {{width : "12%", maxWidth : "12%", "& span" : {fontWeight : "bold"}}} />
                            </ListItem>
                        </List>
                    </Box>
                    <List sx = {{padding : "0px", display : "flex", alignItems : "start", borderBottom : "1px solid black"}}>
                        {
                            notices.map((item) => (
                                <ListItem 
                                    key = {item.boardPostId}
                                    onClick = {() => { navigate(`/board/${item.boardPostId}`); }} 
                                    sx = {{width : "100%", height : "48px", cursor : "pointer", "&:hover" : {backgroundColor : "rgba(160, 151, 212, 0.12)"}}}
                                >
                                    <ListItemText 
                                        primary = {item.boardCategoryTitle} 
                                        sx = {{width : "4%", maxWidth : "4%", textAlign : "center", "& span" : {fontWeight : "bold"}}} />
                                    <ListItemText 
                                        primary = {item.boardPostTitle} 
                                        sx = {{flex : 1, marginLeft : "8px"}} />
                                    <ListItemText 
                                        primary = {item.userNickname} 
                                        sx = {{width : "12%", maxWidth : "12%", textAlign : "center"}} />
                                    <ListItemText 
                                        primary = {item.updatedAt.split("T")[0]} 
                                        sx = {{width : "12%", maxWidth : "12%", textAlign : "center"}} />                                                
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
                {/* 당화혈색소 */}
                {
                    isLogin == true ?
                    <Box sx = {{margin : "16px 0px", padding : "16px", border : "1px solid #A097D4", borderRadius : "8px"}}>
                        <Typography sx = {{fontSize : "16px", fontWeight : "bold"}}>최근 당화혈색소 정보</Typography>
                        <Divider sx = {{margin : "8px 0px", color : "#A097D4"}} />
                        <Typography>수치 : {hba1cData != null ? hba1cData.hba1cValue : null} %</Typography>
                        <Typography>
                            최근 검사일 : {
                                hba1cData != null ? hba1cData.measuredAt.split("T")[0] : null
                            } {
                                hba1cData != null ? hba1cData.measuredAt.split("T")[1].split(":")[0] : null
                            }:{
                                hba1cData != null ? hba1cData.measuredAt.split("T")[1].split(":")[1] : null
                            }
                        </Typography>
                        <Typography>
                            다음 검사일 : {
                                hba1cData != null ? hba1cData.nextTestAt.split("T")[0] : null
                            } {
                                hba1cData != null ? hba1cData.nextTestAt.split("T")[1].split(":")[0] : null
                            }:{
                                hba1cData != null ? hba1cData.nextTestAt.split("T")[1].split(":")[1] : null
                            }
                        </Typography>
                    </Box> : null
                }
                {
                    isLogin == true ?
                    <Box sx = {{display : "flex", justifyContent : "start"}}>
                        {/* 혈당 */}
                        <Box sx = {{padding : "16px", width : "45%", border : "1px solid #A097D4", borderRadius : "8px"}}>
                            <Box sx = {{display : "flex", justifyContent : "space-between", alignItems : "center", width : "100%"}}>
                                <Typography sx = {{fontSize : "16px", fontWeight : "bold"}}>혈당 최근 수치</Typography>
                                <Box sx = {{display : "flex", justifyContent : "space-between", alignItems : "center"}}>
                                    <Select
                                        value = {selectSugarContext}
                                        onChange = {(event, value) => setSelectSugarContext(value)}
                                        placeholder = "측정 상황 선택"
                                        sx = {{}}
                                    >
                                        {
                                            sugarContext.map((item) => (
                                                <Option key = {item.mcId} value = {item.mcCode}>
                                                    {item.mcCode}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                    <Button onClick = {findSugarAverage} sx = {{...btnColor, marginLeft : "16px"}}>찾기</Button>
                                </Box>
                            </Box>
                            <Divider sx = {{margin : "8px 0px", color : "#A097D4"}} />
                            <Typography>최소 : {sugarData != null ? sugarData.min : null} mg/dL</Typography>
                            <Typography>평균 : {sugarData != null ? sugarData.avg : null} mg/dL</Typography>
                            <Typography>최대 : {sugarData != null ? sugarData.max : null} mg/dL</Typography>
                        </Box>
                        <Box sx ={{width : "5%"}}></Box>
                        {/* 혈압 */}
                        <Box sx = {{padding : "16px", width : "50%", border : "1px solid #A097D4", borderRadius : "8px"}}>
                            <Box sx = {{display : "flex", justifyContent : "space-between", alignItems : "center", width : "100%"}}>
                                <Typography sx = {{fontSize : "16px", fontWeight : "bold"}}>혈압 최근 수치</Typography>
                                <Box sx = {{display : "flex", justifyContent : "space-between", alignItems : "center"}}>
                                    <Select
                                        value = {selectPressureContext}
                                        onChange = {(event, value) => setSelectPressureContext(value)}
                                        placeholder = "측정 상황 선택"
                                        sx = {{}}
                                    >
                                        {
                                            pressureContext.map((item) => (
                                                <Option key = {item.mcId} value = {item.mcCode}>
                                                    {item.mcCode}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                    <Button onClick = {findPressureAverage} sx = {{...btnColor, marginLeft : "16px"}}>찾기</Button>
                                </Box>
                            </Box>
                            <Divider sx = {{margin : "8px 0px", color : "#A097D4"}} />
                            <Table sx = {{}}>
                                <thead>
                                    <tr>
                                        <th style = {{textAlign : "center"}}>mmHg / 회</th>
                                        <th style = {{textAlign : "center"}}>최소</th>
                                        <th style = {{textAlign : "center"}}>평균</th>
                                        <th style = {{textAlign : "center"}}>최대</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style = {{textAlign : "center"}}>수축</td>
                                        <td style = {{textAlign : "center"}}>{pressureData != null ? pressureData.sysMin : null}</td>
                                        <td style = {{textAlign : "center"}}>{pressureData != null ? pressureData.sysAvg : null}</td>
                                        <td style = {{textAlign : "center"}}>{pressureData != null ? pressureData.sysMax : null}</td>
                                    </tr>
                                    <tr>
                                        <td style = {{textAlign : "center"}}>이완</td>
                                        <td style = {{textAlign : "center"}}>{pressureData != null ? pressureData.diaMin : null}</td>
                                        <td style = {{textAlign : "center"}}>{pressureData != null ? pressureData.diaAvg : null}</td>
                                        <td style = {{textAlign : "center"}}>{pressureData != null ? pressureData.diaMax : null}</td>
                                    </tr>
                                    <tr>
                                        <td style = {{textAlign : "center"}}>심박수</td>
                                        <td style = {{textAlign : "center"}}>{pressureData != null ? pressureData.pulseMin : null}</td>
                                        <td style = {{textAlign : "center"}}>{pressureData != null ? pressureData.pulseAvg : null}</td>
                                        <td style = {{textAlign : "center"}}>{pressureData != null ? pressureData.pulseMax : null}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Box>
                    </Box> : null
                }
            </Box>
        </>
    );
}
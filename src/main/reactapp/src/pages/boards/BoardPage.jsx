import { Box, Button, List, ListItem, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import axios from "axios";
import { useEffect, useState } from "react";
import { serverDomain } from "../../ApiDomain";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { btnColor } from "../../styles/commonStyle";

export default function BoardPage(props) {

    const navigate = useNavigate();

    /** 탭 인덱스 */
    const [tabIndex, setTabIndex] = useState(0);
    /** 카테고별 게시물 배열 */
    const [posts, setPosts] = useState([]);

    useEffect(() => { findPostByCategory(tabIndex); }, [tabIndex]);

    const categoryTitle = {1 : "공지", 2 : "자유", 3 : "혈당", 4 : "혈압", 5 : "운동"};

    const tabColor = {
        "&[aria-selected='true']" : {
            backgroundColor : "#A097D4", 
            color : "#FFFFFF", 
            "--Tab-indicatorThickness" : "0px"
        },
        "&:not([aria-selected='true']):hover" : {backgroundColor : "rgba(160, 151, 212, 0.12)"}
    };

    const tabComponents = [
        <Tab sx = {{...tabColor}}>전체</Tab>,
        <Tab sx = {{...tabColor}}>공지</Tab>,
        <Tab sx = {{...tabColor}}>자유</Tab>,
        <Tab sx = {{...tabColor}}>혈당</Tab>,
        <Tab sx = {{...tabColor}}>혈압</Tab>,
        <Tab sx = {{...tabColor}}>운동</Tab>
    ];
    /** 카테고리별 게시물 불러오기 */
    const findPostByCategory = async (tabIndex) => {
        try {
            if(tabIndex === 0) {
                const response = await axios.get(`${serverDomain}/board`, {withCredentials : true});
                if(response.status === 200) {
                    console.log(response.data);
                    setPosts(response.data);
                }
            } else {
                const title = categoryTitle[tabIndex];
                const response = await axios.get(`${serverDomain}/board/category/${title}`, {withCredentials : true});
                if(response.status === 200) {
                    console.log(response.data);
                    setPosts(response.data);
                }
            }
        } catch(e) {
            if(e.response.status === 400) {
                setPosts([]);
            }
        }
    }

    return(
        <Box sx = {{boxSizing : "border-box", padding : "40px", backgroundColor : "inherit", width : "100%"}}>
            <Tabs 
                value = {tabIndex} 
                defaultValue = {tabIndex}
                onChange = {(event, value) => { setTabIndex(value); }}               
            >
                <Box 
                    sx = {{
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                        backgroundColor : "#FFFFFF"
                }}>
                    <TabList>
                        {tabComponents}
                    </TabList>
                    <Box sx = {{padding : "8px 16px", paddingBottom : "0px", display : "flex", justifyContent : "end"}}>
                        <Button onClick = {() => { navigate("/board/create"); }} sx = {{...btnColor}}>추가하기</Button>
                    </Box>
                    <List sx = {{padding : "8px 16px", paddingBottom : "0px", display : "flex", alignItems : "start"}}>
                        <ListItem 
                            sx = {{
                                display : "flex", justifyContent : "space-between", 
                                width : "100%", height : "48px",
                                textAlign : "center", borderBottom : "1px solid black", borderTop : "1px solid black"
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
                {
                    tabComponents.map((element, index) => (
                        <TabPanel value = {index} sx = {{padding : "16px", paddingTop : "0px", backgroundColor : "#FFFFFF"}}>
                            <List sx = {{padding : "0px", display : "flex", alignItems : "start", borderBottom : "1px solid black"}}>
                                {
                                    posts.map((item) => (
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
                        </TabPanel>
                    ))
                }
            </Tabs>
        </Box>
    );
}
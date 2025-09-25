import { Box, List, ListItem } from "@mui/joy";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverDomain } from "../ApiDomain";
import { useEffect, useState } from "react";

export default function HomePage(props) {

    const navigate = useNavigate();

    const [notices, setNotices] = useState([]);

    useEffect(() => {
        findAllNotice();
    }, []);

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

    return (
        <>
            <Box sx = {{boxSizing : "border-box", padding : "40px", backgroundColor : "inherit", width : "100%"}}>
                <Box sx = {{borderTop : "1px solid black", backgroundColor : "#FFFFFF"}}>
                    <List sx = {{padding : "0px", display : "flex", alignItems : "start"}}>
                        <ListItem 
                            sx = {{
                                display : "flex", justifyContent : "space-between", 
                                width : "100%", height : "48px",
                                 textAlign : "center", borderBottom : "1px solid black"
                            }}
                        >
                            <ListItemText 
                                primary = "번호" 
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
            </Box>
        </>
    );
}
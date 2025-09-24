import { Box, List, ListItem } from "@mui/joy";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

export default function HomePage(props) {

    const navigate = useNavigate();





    return (
        <>
            <Box sx = {{boxSizing : "border-box", padding : "40px", backgroundColor : "inherit", width : "100%"}}>
                <Box sx = {{borderTop : "1px solid black", backgroundColor : "#FFFFFF"}}>
                    <List sx = {{padding : "0px", display : "flex", alignItems : "start"}}>
                        <ListItem sx = {{width : "100%", textAlign : "start", borderBottom : "1px solid black"}}>
                            <ListItemText primary = "공지1" sx = {{width : "4%", maxWidth : "4%", "& span" : {color : "red"}}} />
                            <ListItemText primary = "내용1" onClick = {() => { alert("클릭1"); }} sx = {{flex : 1, textAlign : "start", cursor : "pointer"}}  />
                        </ListItem>
                        <ListItem sx = {{width : "100%", textAlign : "start", borderBottom : "1px solid black"}}>
                            <ListItemText primary = "공지2" sx = {{width : "4%", maxWidth : "4%", "& span" : {color : "red"}}} />
                            <ListItemText primary = "내용2" onClick = {() => { alert("클릭2"); }} sx = {{flex : 1, textAlign : "start", cursor : "pointer"}} />
                        </ListItem>
                        <ListItem sx = {{width : "100%", textAlign : "start", borderBottom : "1px solid black"}}>
                            <ListItemText primary = "공지3" sx = {{width : "4%", maxWidth : "4%", "& span" : {color : "red"}}} />
                            <ListItemText primary = "내용3" onClick = {() => { alert("클릭3"); }} sx = {{flex : 1, textAlign : "start", cursor : "pointer"}}  />
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </>
    );
}
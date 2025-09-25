import axios from "axios";
import { useParams } from "react-router-dom";
import { serverDomain } from "../../ApiDomain";
import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Textarea, Typography } from "@mui/joy";
import { btnColor, inputFocusColor } from "../../styles/commonStyle";

export default function PostDetailPage(props) {

    const {id} = useParams();

    const [info, setInfo] = useState({});
    const [isUpdateAt, setIsUpdatedAt] = useState(false);
    const [isComment, setIsComment] = useState(false);

    const bottomPx = "12px";

    useEffect(() => { findNotice(); }, [id]);

    const findNotice = async () => {
        try {
            const response = await axios.get(`${serverDomain}/board/${id}`, {withCredentials : true});
            if(response.status === 200) {
                console.log(response.data);
                response.data.updatedAt ? setIsUpdatedAt(true) : setIsUpdatedAt(false);
                response.data.commentDtoList.length !== 0 ? setIsComment(true) : setIsComment(false);
                setInfo(response.data);
            }
        } catch(e) {
            if(e.response.status === 400) { alert("정보를 가져오는데 실패했습니다."); }
        }
    }

    return (
        <Box sx = {{boxSizing : "border-box", padding : "40px", backgroundColor : "inherit", width : "100%"}}>
            {/* {JSON.stringify(info)} */}
            <Box>
                {/* 제목, 닉네임, 날짜 */}
                <Box sx = {{padding : "0px 8px", paddingBottom : bottomPx, display : "flex", justifyContent : "space-between", alignItems : "center", borderBottom : "2px solid grey"}}>
                    <Typography sx = {{flex : 1, fontSize : "20px", fontWeight : "bold"}}>{info.boardPostTitle}</Typography>
                    <Box sx = {{display : "inherit", justifyContent : "space-between", textAlign : "center"}}>
                        <Typography sx = {{marginRight : "20px", fontSize : "20px", fontWeight : "bold"}}>{info.userNickname}</Typography>
                        <Typography sx = {{fontSize : "20px", fontWeight : "bold"}}>{isUpdateAt ? info.updatedAt.split("T")[0] : null}</Typography>
                    </Box>
                </Box>
                <Box sx = {{margin : "12px 8px", padding : "12px 8px", }}>
                    {info.boardPostContent}
                </Box>
                <Box sx = {{padding : "12px 8px", borderTop : "2px solid grey"}}>
                    <Typography sx = {{paddingBottom : bottomPx, fontSize : "20px", fontWeight : "bold"}}>{isComment ? "댓글" : null}</Typography>
                    {/* {JSON.stringify(isComment ? info.commentDtoList : null)} */}
                    <Textarea 
                    minRows = {4}
                    maxRows = {6}
                    endDecorator = {
                        <Box sx = {{textAlign : "center"}}>
                            <Button sx = {{...btnColor, borderRadius : "4px"}}>추가하기</Button>
                        </Box>
                    }
                    sx = {{
                        ...inputFocusColor,
                        padding : "12px",
                        marginBottom : bottomPx,
                        borderRadius : "4px",
                        "& .MuiTextarea-textarea" : {padding : "0px"},
                        "& .MuiTextarea-endDecorator" : {margin : "0px", marginTop : "12px", display : "flex", justifyContent : "end"}
                    }} 
                    />
                    <Box>
                        {
                            isComment ? info.commentDtoList.map((item) => (
                                <Box sx = {{marginBottom : bottomPx, paddingBottom : bottomPx, display : "flex", flexDirection : "column", borderBottom : "1px solid grey"}}>
                                    <Typography>{item.userNickname}</Typography>
                                    <Typography>{item.boardCommentContent}</Typography>
                                    <Typography>{item.updatedAt.split("T")[0]}</Typography>
                                </Box>
                            )) : null
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
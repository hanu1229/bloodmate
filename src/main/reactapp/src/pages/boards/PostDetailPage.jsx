import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { serverDomain } from "../../ApiDomain";
import { useEffect, useState } from "react";
import { Box, Button, Dropdown, IconButton, Menu, MenuButton, MenuItem, Textarea, Typography } from "@mui/joy";
import { btnColor, inputFocusColor } from "../../styles/commonStyle";
import { MoreHoriz, MoreVert, Refresh } from "@mui/icons-material";
import DOMPurify from "dompurify";

export default function PostDetailPage(props) {

    const {id} = useParams();
    const navigate = useNavigate();

    /** 게시물 정보 */
    const [info, setInfo] = useState({});
    /** 댓글 목록 */
    const [comments, setComments] = useState([]);
    /** 댓글 추가를 위한 함수 */
    const [comment, setComment] = useState("");
    /** 게시물의 최신 수정일 */
    const [isUpdateAt, setIsUpdatedAt] = useState(false);
    /** 게시물 작성자 확인 */
    const [postSetting, setPostSetting] = useState();
    /** 댓글이 존재하는지 구분하는 함수 */
    const [isComment, setIsComment] = useState(false);
    /** 댓글 수정을 위한 함수 */
    const [changeComment, setChangeComment] = useState("");
    /** 댓글 등록순 */
    const [isOld, setIsOld] = useState(true);
    /** 댓글 최신순 */
    const [isNew, setIsNew] = useState(false);
    /** 댓글 수정창 */
    const [commentInput, setCommentInput] = useState();

    /** 게시물 내용 출력을 위한 변수 */
    const clean = DOMPurify.sanitize(info.boardPostContent);

    const bottomPx = "12px";

    useEffect(() => { findNotice(); }, [id]);
    useEffect(() => { findComments(); }, [isOld, isNew]);

    const findNotice = async () => {
        try {
            const response = await axios.get(`${serverDomain}/board/${id}`, {withCredentials : true});
            if(response.status === 200) {
                const commentInfo = response.data["commentDtoList"];
                let PostInfo = response.data;
                delete PostInfo.commentDtoList;
                console.log(PostInfo);
                console.log(commentInfo);
                PostInfo.updatedAt ? setIsUpdatedAt(true) : setIsUpdatedAt(false);
                commentInfo.length !== 0 ? setIsComment(true) : setIsComment(false);
                setInfo(PostInfo);
                setComments(commentInfo);
            }
        } catch(e) {
            if(e.response.status === 400) { alert("정보를 가져오는데 실패했습니다."); }
        }
    }
    /** 게시물 본인 확인 */
    const checkPostWriter = async () => {
        try {
            const token = localStorage.getItem("Token");
            if(token == null) { alert("본인이 작성한 게시물이 아닙니다."); return false; }
            const response = await axios.get(`${serverDomain}/board/check-writer/${id}`, {withCredentials : true, headers : {Authorization : token}});
            if(response.status === 200) {
                setPostSetting(response.data);
                return true;
            }
        } catch(e) {
            if(e.response.status === 400) {
                alert("본인이 작성한 게시물이 아닙니다.");
                return false;
            }
        }
    }
    /** 게시물 수정하기 */
    /** 게시물 삭제하기 */
    const deletePost = async () => {
        try {
            const check = checkPostWriter();
            if(check) {
                const token = localStorage.getItem("Token");
                const response = await axios.delete(`${serverDomain}/board/${id}`, {withCredentials : true, headers : {Authorization : token}});
                if(response.status === 200) {
                    alert("게시물을 삭제하였습니다.");
                    navigate("/board");
                }
            }
        } catch(e) {
            if(e.response.status === 400) {
                alert("게시물을 삭제하지 못했습니다.");
            }
        }
    }
    /** 댓글 새로고침 */
    const findComments = async () => {
        try {
            let sort;
            if(isNew === true) { sort = "DESC"; console.log("DESC"); } else if(isOld === true) { sort = "ASC"; console.log("ASC"); }
            const response = await axios.get(`${serverDomain}/board/comment/${id}?sort=${sort}`, {withCredentials : true});
            if(response.status === 200) {
                console.log(response.data);
                setComments(response.data);
            }
        } catch(e) {
            if(e.response.status === 400) {
                console.log("새로운 댓글이 없습니다.");
            }
        }
    }
    /** 댓글 추가하기 */
    const createComment = async () => {
        try {
            const token = localStorage.getItem("Token");
            if(token == null) { alert("로그인 해주세요"); return; }
            const obj = {boardCommentContent : comment}
            const response = await axios.post(`${serverDomain}/board/comment/${id}`, obj, {withCredentials : true, headers : {Authorization : token}});
            if(response.status === 201) {
                setComment("");
                findComments();
            }
        } catch(e) {
            if(e.response.status === 400) { alert("정상적으로 처리하지 못했습니다."); return; }
        }
    }
    /** 댓글 수정하기 */
    const updateComment = async (boardCommentId) => {
        try {
            const token = localStorage.getItem("Token");
            const obj = {boardCommentContent : changeComment}
            const response = await axios.put(`${serverDomain}/board/comment/${boardCommentId}`, obj, {withCredentials : true, headers : {Authorization : token}});
            if(response.status === 200) {
                setChangeComment("");
                setCommentInput(0);
                findComments();
            }
        } catch(e) {
            if(e.response.status === 400) {
                alert("정상적으로 처리하지 못했습니다.");
            }
        }
    }
    /** 댓글 수정 Textarea 열기 */
    const openTextArea = async (boardCommentId) => {
        const token = localStorage.getItem("Token");
        if(token == null) { alert("본인이 작성한 댓글이 아닙니다."); return; }
        try { 
            const response = await axios.get(`${serverDomain}/board/comment/check-writer/${boardCommentId}`, {withCredentials : true, headers : {Authorization : token}});
            if(response.status === 200) {
                setCommentInput(boardCommentId);
            }
        } catch(e) {
            if(e.response.status === 400) {
                alert("본인이 작성한 댓글이  아닙니다.");
            }
        }
    }
    /** 댓글 삭제하기 */
    const deleteComment = async (boardCommentId) => {
        const answer = confirm("정말 삭제하시겠습니까?");
        if(!answer) { return; }
        try {
            const token = localStorage.getItem("Token");
            const response = await axios.delete(`${serverDomain}/board/comment/${boardCommentId}`, {withCredentials : true, headers : {Authorization : token}});
            if(response.status === 200) {
                findComments();
            }
        } catch(e) {
            if(e.response.status === 400) { alert("정상적으로 처리하지 못했습니다."); }
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
                        <Dropdown>
                            <MenuButton variant = "plain" sx = {{padding : "0px", paddingLeft : "20px"}}><MoreVert/></MenuButton>
                            <Menu>
                                <MenuItem>수정하기</MenuItem>
                                <MenuItem onClick = {deletePost}>삭제하기</MenuItem>
                            </Menu>
                        </Dropdown>
                    </Box>
                </Box>
                <Box sx = {{margin : "12px 8px", padding : "12px 8px"}}>
                    {/* HTML을 렌더링 해줌 */}
                    <div className = "post-body" dangerouslySetInnerHTML = {{__html : clean}} />
                </Box>
                <Box sx = {{padding : "12px 8px", borderTop : "2px solid grey"}}>
                    <Box sx = {{paddingBottom : bottomPx, display : "flex", alignItems : "center"}}>
                        <Typography sx = {{fontSize : "20px", fontWeight : "bold"}}>댓글</Typography>
                        <IconButton onClick = {findComments}>
                            <Refresh sx = {{width : "20px", height : "20px"}} />
                        </IconButton>
                    </Box>
                    {/* {JSON.stringify(isComment ? comment : null)} */}
                    <Textarea 
                    value = {comment}
                    onChange = {(event) => { setComment(event.target.value); }}
                    minRows = {4}
                    maxRows = {6}
                    endDecorator = {
                        <Box sx = {{textAlign : "center"}}>
                            <Button onClick = {createComment} sx = {{...btnColor, borderRadius : "4px"}}>추가하기</Button>
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
                    <Box sx = {{marginBottom : "12px", display : "flex", alignItem : "center"}}>
                        <Typography onClick = {() => { setIsNew(false); setIsOld(true); }} sx = {{color : isOld ? "black" : "gray", cursor : "pointer"}}>등록순</Typography>
                        <Typography sx = {{margin : "0px 6px"}}>│</Typography>
                        <Typography onClick = {() => { setIsOld(false); setIsNew(true); }} sx = {{color : isNew ? "black" : "gray", cursor : "pointer"}}>최신순</Typography>
                    </Box>
                    <Box>
                        {
                            isComment ? comments.map((item) => {
                                const [date, time] = item.updatedAt.split("T");
                                const [hour, minute, second] = time.split(":");
                                return (
                                <Box key = {item.boardCommentId} sx = {{marginBottom : bottomPx, paddingBottom : bottomPx, display : "flex", flexDirection : "column", borderBottom : "1px solid grey"}}>
                                    <Box sx = {{display : "flex", flexDirection : "column", justifyContent : "space-between"}}>
                                        {commentInput === item.boardCommentId ? 
                                            <Textarea
                                                autoFocus
                                                value = {changeComment}
                                                onChange = {(event) => { setChangeComment(event.target.value); }}
                                                minRows={4}
                                                maxRows={6}
                                                endDecorator = {
                                                    <Box sx = {{display : "flex", justifyContent : "end"}}>
                                                        <Button onClick = {() => { setChangeComment(""); setCommentInput(0); }} color = "neutral" sx = {{borderRadius : "4px", marginRight : "12px"}}>취소하기</Button>
                                                        <Button onClick = {() => { updateComment(item.boardCommentId); }} sx = {{...btnColor, borderRadius : "4px"}}>수정하기</Button>
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
                                            /> : ""
                                        }
                                        <Box sx = {{display : "flex", justifyContent : "space-between"}}>
                                            <Typography sx = {{marginBottom : "8px", fontWeight : "bold"}}>{item.userNickname}</Typography>
                                            <Dropdown>
                                                <MenuButton variant = "plain"><MoreHoriz/></MenuButton>
                                                <Menu>
                                                    <MenuItem onClick = {() => { openTextArea(item.boardCommentId); }}>수정</MenuItem>
                                                    <MenuItem onClick = {() => { deleteComment(item.boardCommentId); }}>삭제</MenuItem>
                                                </Menu>
                                            </Dropdown>
                                        </Box>
                                    </Box>
                                    <Typography sx = {{marginBottom : "8px"}}>{item.boardCommentContent}</Typography>
                                    <Typography>{`${date} ${hour}:${minute}`}</Typography>
                                </Box>);
                            }) : null
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
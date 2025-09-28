import { Box, Button, Card, Input, Option, Select, Typography } from "@mui/joy";
import CustomEditor from "../../components/CustomEditor";
import { btnColor } from "../../styles/commonStyle";
import { useEffect, useState } from "react";
import { serverDomain } from "../../ApiDomain";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePostPage(props) {

    const navigate = useNavigate();

    /** 카테고리 타이틀 */
    const [category, setCategory] = useState("");
    /** 제목 */
    const [title, setTitle] = useState("");
    /** 내용 */
    const [content, setContent] = useState("");


    useEffect(() => {}, [content]);

    /** 게시물 작성 */
    const createPost = async () => {
        try {
            const info = {boardCategoryTitle : category, boardPostTitle : title, boardPostContent : content};
            const token = localStorage.getItem("Token");
            const response = await axios.post(`${serverDomain}/board`, info, {withCredentials : true, headers : {Authorization : token}});
            if(response.status === 201 && response.data) {
                alert("게시물 작성에 성공했습니다.");
                navigate("/board");
            }
        } catch(e) {
            if(e.response.status === 400) {
                alert("게시물 작성에 실패했습니다.");
            }
        }    
    }
    /** 작성 취소 */
    const cancelPost = async () => {
        const answer = confirm("입력하신 정보는 모두 사라집니다.\n정말로 취소하시겠습니까?");
        if(answer) { navigate("/board"); }
    }


    return (
        <Box sx = {{boxSizing : "border-box", padding : "40px", backgroundColor : "inherit", width : "100%"}}>
            <Box sx = {{display : "flex"}}>
                <Card sx = {{width : "66%"}}>
                    <Typography sx = {{fontSize : "20px", fontWeight : "bold"}}>카테고리(분류)</Typography>
                    <Select value = {category} onChange = {(event, value) => {setCategory(value);}} placeholder = "선택해주세요">
                        <Option value = {"공지"}>공지</Option>
                        <Option value = {"자유"}>자유</Option>
                        <Option value = {"혈당"}>혈당</Option>
                        <Option value = {"혈압"}>혈압</Option>
                        <Option value = {"운동"}>운동</Option>
                    </Select>
                    <Typography sx = {{fontSize : "20px", fontWeight : "bold"}}>제목</Typography>
                    <Input type = "text" value = {title} onChange = {(event) => {setTitle(event.target.value);}} placeholder = "제목을 입력해주세요" />
                    <Typography sx = {{fontSize : "20px", fontWeight : "bold"}}>내용</Typography>
                    <CustomEditor value = {content} onChange = {setContent} />
                    <Box sx = {{display : "flex", justifyContent : "end"}}>
                        <Button onClick = {createPost} sx = {{...btnColor}}>작성하기</Button>
                        <Button onClick = {cancelPost} color = "neutral" sx = {{marginLeft : "20px"}}>취소하기</Button>
                    </Box>
                </Card>
                <Card sx = {{marginLeft : "1%", width : "33%"}}>
                    <Typography>{content}</Typography>
                </Card>
            </Box>
        </Box>
    );
}
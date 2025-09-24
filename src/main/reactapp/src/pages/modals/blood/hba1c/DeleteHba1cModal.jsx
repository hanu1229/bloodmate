import { Box, Button, Typography } from "@mui/joy";
import axios from "axios";
import { serverDomain } from "../../../../ApiDomain";

export default function DeleteHba1cModal(props) {

    const deleteHba1c = async () => {
        const answer = confirm("정말 삭제하시겠습니까?");
        if(!answer) { return; }
        try {
            const token = localStorage.getItem("Token");
            const response = await axios.delete(`${serverDomain}/blood/hba1c/${props.rowInfo.hba1cId}`, {withCredentials : true, headers : {Authorization : token}});
            if(response.status === 200) {
                alert("정상적으로 삭제되었습니다.");
                props.findAll(); 
                props.onClose();
            }
        } catch(e) {
            if(e.response.status === 400) {
                alert("정상적으로 삭제하지 못했습니다.");
            }
        }
    }
    
    return (
        <Box sx = {{padding : "12px", display : "flex", flexDirection : "column", flex : 1, height : "100%"}}>
            <Box sx = {{marginBottom : "24px", display : "flex", justifyContent : "space-between", alignItems : "center"}}>
                <Box>
                    <Typography sx = {{marginBottom : "4px", color : "red", fontSize : "20px", fontWeight : "bold"}}>※ 정말 삭제하시겠습니까?</Typography>
                    <Typography sx = {{marginBottom : "4px", color : "red", fontSize : "20px", fontWeight : "bold"}}>※ 데이터가 영구 삭제되어 복구 할 수 없습니다.</Typography>
                </Box>
            </Box>
            <Button color = "danger" onClick = {deleteHba1c}>삭제하기</Button>
        </Box>
    );
}
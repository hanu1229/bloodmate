import { Info } from "@mui/icons-material";
import { Box, Modal, ModalClose, Sheet, Tooltip, Typography } from "@mui/joy";
import { btnColor } from "../../styles/commonStyle";

export function CustomModal(props) {
    return (
        <Modal 
            aria-labelledby="modal-title" 
            aria-describedby="modal-desc" 
            open = {props.open} 
            onClose = {props.onClose} 
            /** 블러 처리 삭제 */
            // slots = {{backdrop : "span"}}
            sx = {{
                display : "flex", justifyContent : "center", alignItems : "center", zIndex : 100
                }}
        >
            <Sheet 
                variant = "outlined" 
                sx = {{
                    display : "flex",
                    flexDirection : "column",
                    padding : "12px",
                    minWidth : "400px", maxWidth : "480px", 
                    minHeight : 0, maxHeight : "480px", 
                    borderRadius : "16px", boxShadow : "lg",
                    overflowY : "hidden", background : "#FFFFFF"
                }}
            >
                <ModalClose variant = "outlined"/>
                <Typography sx = {{marginLeft : "12px", marginBottom : "12px", fontSize : "20px", fontWeight : "bold"}}>
                    {
                        <Box sx = {{display : "flex", alignItems : "center"}}>
                            {props.title}
                            {
                                props.isInfo ? <Tooltip
                                    title = "본 서비스는 개인 건강정보의 기록·보관을 위한 용도입니다."
                                    sx = {{...btnColor}}
                                >
                                    <Info sx ={{width : "20px", height : "20px", color : "grey", marginLeft : "4px"}} />
                                </Tooltip> : null
                            }
                        </Box>
                    }
                </Typography>
                <Box sx = {{width : "100%", height : "100%", overflowY : "auto", overflowX : "hidden", minHeight : 0}}>
                    {props.children}
                </Box>
            </Sheet>
        </Modal>
    );
}
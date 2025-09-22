import { Box, Modal, ModalClose, Sheet, Typography } from "@mui/joy";

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
                <Typography sx = {{marginLeft : "12px", marginBottom : "12px", fontSize : "20px", fontWeight : "bold"}}>{props.title}</Typography>
                <Box sx = {{width : "100%", height : "100%", overflowY : "auto", overflowX : "hidden", minHeight : 0}}>
                    {props.children}
                </Box>
            </Sheet>
        </Modal>
    );
}
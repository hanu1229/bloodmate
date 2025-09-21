import { Box } from "@mui/joy";
import { useNavigate } from "react-router-dom";

export default function HomePage(props) {

    const navigate = useNavigate();

    return (
        <>
            <Box
                sx = {{
                    boxSizing: "border-box",
                    padding : "20px",
                    height : "100%", 
                    backgroundColor : "#f6f6f6"
                }}
            >
                홈
            </Box>
        </>
    );
}
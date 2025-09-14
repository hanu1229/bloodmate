import { Box } from "@mui/joy";
import useCustomNavigate from "../../useCustomNavigate";
import { useEffect } from "react";

export default function BloodSugarPage(props) {

    const checkLogin = useCustomNavigate();

    useEffect(() => { checkLogin(); }, []);

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
                혈당
            </Box>
        </>
    );
}
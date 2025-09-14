import { Box } from "@mui/joy";
import { useEffect } from "react";
import useCustomNavigate from "../../useCustomNavigate";

export default function BloodPressurePage(props) {

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
                혈압
            </Box>
        </>
    );
}
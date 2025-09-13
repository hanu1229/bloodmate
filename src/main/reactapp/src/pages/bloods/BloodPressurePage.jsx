import { Box } from "@mui/joy";

export default function BloodPressurePage(props) {
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
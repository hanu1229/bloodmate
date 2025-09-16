import { Box } from "@mui/joy";

export default function HomePage(props) {

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
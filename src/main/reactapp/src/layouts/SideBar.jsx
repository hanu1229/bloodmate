import { Box } from "@mui/joy";
import { Link, useLocation } from "react-router-dom";

// import "../styles/sidebar.css";

export default function SideBar(props) {

    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <>
            <Box sx = {{width : "12%", height : "100%", backgroundColor : "#D9D9D9"}}>
                {/* 홈 */}
                <Link to = "/" style = {{textDecoration : "none", color : "black", fontWeight : "bold"}}>
                    <Box sx = {{padding : "8px 0px 8px 12px", backgroundColor : isActive("/") ? "#FFFFFF" : "inherit"}}>
                        홈 
                    </Box>
                </Link>
                {/* 대시보드 */}
                <Link to = "/dashboard" style = {{textDecoration : "none", color : "black", fontWeight : "bold"}}>
                    <Box sx = {{padding : "8px 0px 8px 12px", backgroundColor : isActive("/dashboard") ? "#FFFFFF" : "inherit"}}>
                        대시보드 
                    </Box>
                </Link>
                {/* 당화혈색소 */}
                <Link to = "/blood/hba1c" style = {{textDecoration : "none", color : "black", fontWeight : "bold"}}>
                    <Box sx = {{padding : "8px 0px 8px 12px", backgroundColor : isActive("/blood/hba1c") ? "#FFFFFF" : "inherit"}}>
                        당화혈색소
                    </Box>
                </Link>
                {/* 혈당 */}
                <Link to = "/blood/sugar" style = {{textDecoration : "none", color : "black", fontWeight : "bold"}}>
                    <Box sx = {{padding : "8px 0px 8px 12px", backgroundColor : isActive("/blood/sugar") ? "#FFFFFF" : "inherit"}}>
                        혈당
                    </Box>
                </Link>
                {/* 혈압 */}
                <Link to = "/blood/pressure" style = {{textDecoration : "none", color : "black", fontWeight : "bold"}}>
                    <Box sx = {{padding : "8px 0px 8px 12px", backgroundColor : isActive("/blood/pressure") ? "#FFFFFF" : "inherit"}}>
                        혈압
                    </Box>
                </Link>
            </Box>
        </>
    );
}
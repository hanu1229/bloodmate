import "../styles/header.css";
import Button from "@mui/joy/Button";

export default function Header(props) {

    const loginButtonClick = () => {
        alert("로그인 페이지로 넘기기");
    };

    return <>
        <div className = "header-main">
            <ul>
                <li>
                    <b>블러드메이트</b>
                </li>
                <li>
                    <Button sx = {
                        {
                            backgroundColor : "#A097D4", 
                            "&:hover" : {
                                backgroundColor : "#FFFFFF", 
                                color : "#000000"
                            }
                        }
                    } onClick={loginButtonClick}>로그인</Button>
                </li>
            </ul>
        </div>
    </>;
}
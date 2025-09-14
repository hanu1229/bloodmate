import { useNavigate } from "react-router-dom";

export default function useCustomNavigate(props) {
    const navigate = useNavigate();

    const checkLogin = () => {
        const token = localStorage.getItem("Token");
        if(token == null) {
            alert("로그인을 해주세요");
            navigate("/");
            return false;
        }
        return true;
    }
    

    return checkLogin;
}
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverDomain } from "./ApiDomain";

export default function useCustomNavigate(props) {
    const navigate = useNavigate();

    const checkLogin = async () => {
        const token = localStorage.getItem("Token");
        if(token == null) {
            alert("로그인을 해주세요");
            navigate("/");
            return false;
        }
        const response = await axios.get(`${serverDomain}/user/check-login-state`, {withCredentials : true, headers : {Authorization : token}});
        console.log(response.data);
        if(response.data) { return true; }
        return false;
    }
    

    return checkLogin;
}
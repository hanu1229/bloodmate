import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";
import DashBoard from "./DashBoard";
import BloodSugarPage from "./BloodSugarPage";
import BloodPressurePage from "./BloodPressurePage";
import IdSearchPage from "./IdSearchPage";
import PasswordSearchPage from "./PasswordSearchPage";
import SignupPage from "./SignupPage";

export default function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                {/* ↓ 레이아웃 전용 라우트 설정 */}
                <Route element = {<MainLayout/>}>
                    <Route path = "/" element = {<DashBoard/>}/>
                    <Route path = "/blood/sugar" element = {<BloodSugarPage/>}/>
                    <Route path = "/blood/pressure" element = {<BloodPressurePage/>}/>
                </Route>
                <Route path = "/login" element = {<LoginPage/>}/>
                <Route path = "/search/id" element = {<IdSearchPage/>}/>
                <Route path = "/search/password" element = {<PasswordSearchPage/>}/>
                <Route path = "/signup" element = {<SignupPage/>}/>
                <Route path = "*" element = {<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}
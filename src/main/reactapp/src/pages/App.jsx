import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./users/LoginPage";
import DashBoard from "./DashBoard";
import BloodSugarPage from "./bloods/BloodSugarPage";
import BloodPressurePage from "./bloods/BloodPressurePage";
import IdSearchPage from "./users/IdSearchPage";
import PasswordSearchPage from "./users/PasswordSearchPage";
import SignupPage from "./users/SignupPage";
import BoardPage from "./boards/BoardPage";
import BloodHba1cPage from "./bloods/BloodHba1cPage";
import ResetPasswordPage from "./users/ResetPasswordPage";
import HomePage from "./HomePage";

export default function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                {/* ↓ 레이아웃 전용 라우트 설정 */}
                <Route path = "/" element = {<MainLayout/>}>
                    <Route path = "/" element = {<HomePage/>}/>
                    <Route path = "/dashboard" element = {<DashBoard/>}/>
                    <Route path = "/blood/hba1c" element = {<BloodHba1cPage/>}/>
                    <Route path = "/blood/sugar" element = {<BloodSugarPage/>}/>
                    <Route path = "/blood/pressure" element = {<BloodPressurePage/>}/>
                </Route>
                <Route path = "/board" element = {<BoardPage/>}/>
                <Route path = "/login" element = {<LoginPage/>}/>
                <Route path = "/search/id" element = {<IdSearchPage/>}/>
                <Route path = "/search/password" element = {<PasswordSearchPage/>}/>
                <Route path = "/reset-password/:token" element = {<ResetPasswordPage />}/>
                <Route path = "/signup" element = {<SignupPage/>}/>
                <Route path = "*" element = {<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}
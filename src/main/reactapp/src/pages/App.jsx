import Header from "../layouts/Header";
import MainLayout from "../layouts/MainLayout";
import SideBar from "../layouts/Sidebar";
import "../styles/app.css";

export default function App(props) {
    return <div style={{display : "flex", flexWrap : "wrap", height : "100vh"}}>
        <Header></Header>
        <div className = "layouts">
            <SideBar></SideBar>
            <MainLayout></MainLayout>
        </div>
    </div>
    
}
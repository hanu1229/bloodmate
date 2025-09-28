import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

export default function CustomEditor(props) {
    return (
        <SunEditor
            value = {props.content}
            onChange = {props.onChange}
            height = "320px"
        />
    );
}
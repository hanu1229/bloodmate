import { useEffect } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

export default function CustomEditor(props) {

    useEffect(() => {
        console.log(`setContents : ${props.value}`);

    }, []);

    return (
        <SunEditor
            setContents = {props.value}
            onChange = {props.onChange}
            height = {props.height}
            setOptions={{
                defaultStyle : "font-size : 20px; line-height : 1.7;"
            }}
        />
    );
}
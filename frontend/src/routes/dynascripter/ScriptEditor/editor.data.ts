import { createStore } from "solid-js/store";
import { EditorInit } from "./EditorInit";

// Supplies starting url info to Squabble Scripter Editor
// export default function preloadScriptEditor({params, location, navigate, data}){
export default function preloadScriptEditor({params, location}){
    console.log("The editor init function has run");
    console.log(EditorInitParams);
    return EditorInitParams;
}

export const [EditorInitParams, SetEditorInitParams] = createStore<EditorInit>({} as EditorInit);

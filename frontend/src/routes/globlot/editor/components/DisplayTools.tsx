import { For, Setter, VoidProps } from "solid-js";
import { Tool, tools } from "../tools/tool";


export const DisplayTools = (props : VoidProps<{setTool : Setter<Tool>}>) => (

    <For each={tools}>{tool =>
        <button class="tool-button" onclick={()=>{
            props.setTool(tool);
            //activeTool = tool;
            alert(`Tool has been switched to ${tool.name}`);
            
        }}>
            <img alt={tool.name}></img>
        </button>
        }
    </For>
    )

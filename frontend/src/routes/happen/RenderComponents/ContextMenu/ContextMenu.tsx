import { For } from "solid-js";


export default function ContextMenu(props : {nodeCtx : Node}){
    
    function GenerateContextMenuOptions(){
        let mode : string;

        if(props.nodeCtx == undefined){
            mode = "default";
        }
        else{
            // Get the type of node and a list of likely options to connnect
        }
        
    }

    function CreateContextMenu(){
        
    }
    
    return(
        <div class="context-menu">
            <h1>{props.node.action}</h1>
            <For each={Object.entries(props.node.args)}>
                {
                    (entry) => <ContextMenuOption arg={entry as {}} />
                }
            </For>
        </div>
    )
}
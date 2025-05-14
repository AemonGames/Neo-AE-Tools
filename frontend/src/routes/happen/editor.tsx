import { onMount } from "solid-js";
import NodeTreeRenderer from "./RenderComponents/NodeTree/NodeTreeRenderer";

// Import styles
import './editor.scss';

import { createStore } from "solid-js/store";
import { npc_sample } from "./Examples/NPC_Example";
import NodeExecutionRenderer from "./RenderComponents/NodeTester/NodeExecutionRenderer";

export default function HapnEditor(){
    let canvas : HTMLCanvasElement;

    
    // Node tree in editor will be represented as a json sequence
    const [NodeTree, AmendNodeTree] = createStore({"sequence": [ ]});

    onMount(() => {
        AmendNodeTree(npc_sample as object);

        //NodeTree
    });

    
    return(
        <main class="container">
            <NodeTreeRenderer nodeTree={NodeTree as {sequence : []}}/>
            <NodeExecutionRenderer />
        </main>
    )

}
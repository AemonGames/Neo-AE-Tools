import { LogNode } from "../../structs/ActionNodes";
import NodeTree from "../NodeTree/NodeTree";

import './styles.scss';


export default function(){

    const logNode : LogNode = new LogNode("Hello world");

    const nodeTree : NodeTree = new NodeTree(logNode);

    return(
        <div class="node-execution-preview-panel">
            <h1>Node Tree</h1>
            <button // Button acts as a runner for the node tree (TEMP)
                onclick={() => nodeTree.Update()}
            >
                Click to Execute Node Tree
            </button>
        </div>
    )
}
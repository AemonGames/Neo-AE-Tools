import { createEffect, For, JSX, onMount } from "solid-js";
import NodeTree from "./NodeTree";

import { LogNode } from "../../structs/ActionNodes";
import "./NodeTreeRenderer.scss";
import { NodeRenderer } from "../Node/NodeRenderer";

export default function NodeTreeRenderer(props: {nodeTree : {"sequence": []}}) : JSX.Element{



    return(
        <div class="node-tree-visualizer-container">
            <For each={Object.values(props.nodeTree['sequence'])}>
            {
                (val) => (
                    <NodeRenderer node={val} />
                )
            }
            </For>
        </div>
    )
}
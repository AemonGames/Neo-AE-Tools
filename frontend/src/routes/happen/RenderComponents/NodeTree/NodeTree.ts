import { Node, NodeState } from "../../structs/node";

import { npc_sample } from "../../Examples/NPC_Example";


export default class NodeTree {

    // Likely unnecessary
    state : NodeState

    constructor(public rootNode : Node) {
        this.state = NodeState.Inactive;
        this.LoadNodeTree();
    }

    Update() : NodeState {
        console.log("Node Tree Updated");
        return this.rootNode.Update();
    }

    GetAllNodes() : Node[] {
        return this.rootNode.children
    }

    LoadNodeTree() {
        
        // const root = Object.keys(npc_sample);
        
        const commands = Object.values(npc_sample['sequence']);
        console.log(commands.length);

        commands.forEach((key) => {
            console.log(key);
        })


    }

}
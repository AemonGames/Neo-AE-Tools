import { CompositeNode, NodeState } from "./node";

export class SequenceNode extends CompositeNode {

    protected OnStart(): void {
        console.log("SequenceNode started");
    }

    protected OnUpdate(): NodeState {
        console.log("SequenceNode updated");
        for (let i = 0; i < this.children.length; i++) {
            let state = this.children[i].Update();
            if (state == NodeState.Failure) {
                return NodeState.Failure;
            }
        }
        return NodeState.Success;
    }

    protected OnStop(): void {
        console.log("SequenceNode stopped");
    }
}

export class BranchNode extends CompositeNode{

    requiredChildCount = 2;
    conditionalIndex = -1;

    protected OnStart(): void {
        // Check the condition



        this.conditionalIndex = -1;
    }

    protected OnUpdate(): NodeState {
        return this.state;
    }

    protected OnStop(): void {
        
    }




}
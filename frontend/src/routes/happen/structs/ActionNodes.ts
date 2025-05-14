import { LeafNode, NodeState } from "./node";

export class TestLeafNode extends LeafNode {
    protected OnStart(): void {
        console.log("LogNode started");
    }
    protected OnUpdate(): NodeState {
        console.log("LogNode updated");
        return NodeState.Success;
    }
    protected OnStop(): void {
        console.log("LogNode stopped");
    }
}

export class LogNode extends LeafNode {

    constructor (public message : string){
        super();
    }

    protected OnStart(): void {
        console.log(this.message);
    }
    protected OnUpdate(): NodeState {
        return NodeState.Success;
    }
    protected OnStop(): void {
    }
}

export class WaitNode extends LeafNode {

    constructor (public duration : number){
        super();
    }

    protected OnStart(): void {
        console.log("WaitNode started");
    }
    protected OnUpdate(): NodeState {
        if (this.duration > 0){
            this.duration -= 1;
            return NodeState.Running;
        }
        return NodeState.Success;
    }
    protected OnStop(): void {
        console.log("WaitNode stopped");
    }
}


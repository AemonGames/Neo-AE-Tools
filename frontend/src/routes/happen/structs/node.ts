import { JSX} from "solid-js";

// export enum NodeState {
//     ACTIVE,
//     INACTIVE,
//     COMPLETED
// }
export enum NodeState {
    Inactive,
    Running,
    Failure,
    Success
}

export abstract class Node {

    state : NodeState

    constructor(public children: Node[]) {
        this.state = NodeState.Inactive;

    }

    public Update() : NodeState {
        if (this.state == NodeState.Inactive) {
            this.OnStart();
            this.state = NodeState.Running;
        }

        this.state = this.OnUpdate();

        if (this.state == NodeState.Failure || this.state == NodeState.Success) {
            this.OnStop();
        }

        return this.state;
    }

    protected abstract OnStart() : void;
    protected abstract OnUpdate() : NodeState;
    protected abstract OnStop() : void;
    
}

// Node that can have multiple children
export abstract class CompositeNode extends Node {
    constructor(public children: Node[]) {
        super(children);
    }


}

// Node that can have only one child
export abstract class DecoratorNode extends Node {
    constructor(children: Node[]) {
        super(children);
    }
}

// Node that has no children
export abstract class LeafNode extends Node {
    constructor() {
        super([]);
    }
}


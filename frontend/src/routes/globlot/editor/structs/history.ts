
// User actions should contain user, time, and the result of the action

import { MapLayer } from "../data/types";

interface UserAction {
    user: string;
    time: Date;
    result: string;
}

interface PaintAction extends UserAction {
    layerIndex: number;
    layerChanges : MapLayer;
}

interface ScriptAction extends UserAction {
    scriptChanges: string;
}

// ActionChain should contain a list of actions
// Instance of an action chain should only exist on the server
class ActionChain {

    private actions: UserAction[] = [];

    addAction(action: UserAction): void {
        this.actions.push(action);
    }

    removeAction(action: UserAction): void {
        this.actions = this.actions.filter((a) => a !== action);
    }

    getActions(): UserAction[] {
        return this.actions;
    }
}
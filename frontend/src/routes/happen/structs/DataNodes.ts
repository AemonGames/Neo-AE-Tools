import { Node } from "./node";

const ConditionalOperator = [
    ">", "<", "==", "!=", ">=", "<="
]

const LogicalOperator = [
    "||", "&&", "^"
]


export class BooleanNode {


    constructor(public lValue : {value : object}, public rValue : {value : object}, public operator : string){
        
    }

    Validate(){
        // Makes sure input is capable of comparison
    }

    Compare(){
        switch(this.operator){
            case ">":
                return this.lValue.value > this.rValue.value;
        }
    }


} 

export class NullcheckNode {
    
}
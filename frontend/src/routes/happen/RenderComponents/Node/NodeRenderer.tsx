import { createSignal, For, JSX, Match, onMount, Switch } from 'solid-js';
import './NodeRenderer.scss';
import { enum_dict } from '../../Examples/NPC_Example';
import { Option, Select } from '@thisbeyond/solid-select';
import Line from '../Line/Line';


// Each node renderer should have a reference to the next node in the sequence
export function NodeRenderer(props: {node? : Node}){

    let nodeElement : HTMLDivElement;
    // let isDragging : boolean = false;
    let offsetCalculated : boolean = false;
    let offsetX : number = 0;
    let offsetY : number = 0;
    

    function BeginElementReposition(e : PointerEvent){
        // isDragging = true;

        addEventListener('pointermove', RepositionElement);
        addEventListener('pointerup', EndElementReposiiton);

        const rect = nodeElement.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        // console.log(enum_dict.expression["Sad"]);
        // console.log(enum_dict.expression[4]);
    }
    
    function RepositionElement(e : PointerEvent){
        nodeElement.style.left = (e.clientX - offsetX) + 'px';
        nodeElement.style.top = (e.clientY - offsetY) + 'px';
    }

    function EndElementReposiiton(){
        // isDragging = false;
        removeEventListener('pointermove', RepositionElement);
        removeEventListener('pointerup', EndElementReposiiton);
    }

    function ParseValueOption(label : string){
        console.log(label);
        const splitLabel = label.split('_');
        console.log(splitLabel[0]);
    }

    function RenderNodeValue(props: {arg : any[]}) : JSX.Element{


        const entry = Object.entries(props.arg);

        const [varName, value] = props.arg;


        console.log(`key: ${varName}`);
        console.log(`value: ${value}`);
        // console.log(entry);

        const splitName = varName.split('_');

        switch(splitName[0]){
            case 'enum':

                console.log("Enum Detected");
                console.log(enum_dict[splitName[1]]);

                // Replace dropdown with solid select

                return(
                    <div>
                        {
                            enum_dict[splitName[1]] &&(
                            <Select options={Object.values(enum_dict[splitName[1]])
                                .filter((val)=>isNaN(val)) 
                                } />
                            )
                        }
                    </div>
                )
            case 'int':
                console.log('int');
                break;
            case 'string':
                console.log('string');
                break;
            default:
                console.log('default');
        }


        //ParseValueOption(entry[0])

        return(
            <div class='node-arg'>
                <h1>NoReturn</h1>

            </div>
        )
    }

    let connector! : HTMLDivElement;
    const [EndPoint, SetEndPoint] = createSignal<HTMLDivElement>();


    return(
        <div class="node" ref={nodeElement!} onPointerDown={BeginElementReposition}>

            <h1 inert>{props.node?.action}</h1>

            { // Parse values and give options for insertion
                props.node.args &&
            <For each={Object.entries((props.node as any)?.args)}>
                {
                    (entry) => <RenderNodeValue arg={entry as {}} />
                }
            </For>
            }

            <div class="node-connector" ref={connector!}>
                <Line ownerID={props.node?.action + "_line"} startPoint={connector} endPoint={EndPoint()}/>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div class="node-connector" ref={(el) => SetEndPoint(el)} />

            {/* <Switch fallback={<h1 inert>Unknown Node</h1>}>
                
            <Match when={props.node?.action === "Speak"}>
                <h2 inert>props.node?.</h2>
            </Match>

            <Match when={props.node?.action === "WaitNode"}>

            </Match>


            <Match when={props.node?.action === "LogNode"}>

            </Match>

            </Switch> */}
        </div>
    )
}
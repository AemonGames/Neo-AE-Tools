import { ComponentProps, createSignal, For, JSX, Show, VoidProps } from 'solid-js';
import check_img from '../../../../resources/Check-256.png';
import './form-editor.scss';
import { Select } from '@thisbeyond/solid-select';
import "@thisbeyond/solid-select/style.css";
import Options from '../../Options/Options';
import { createStore, produce } from 'solid-js/store';
import {
    animate,
    createTimeline,
    createTimer,
    // ...other methods
  } from 'animejs';

// 8 Total possible script types (Value becomes locked once details are added)
enum ScriptType{
    None,
    Ability,
    Weather,
    Field,
    Move,
    Item,
    Status,
    Trap,
    Hazard
}

const defaultOption = 0;
//var selectedOption = defaultOption;

// Change to enums
enum MonType {
    None = 'None',
    Air = 'Air',
    Bug = 'Bug',
    Dark = 'Dark',
    Dragon = 'Dragon',
    Earth = 'Earth',
    Electric = 'Electric',
    Faerie = 'Faerie',
    Fight = 'Fight',
    Fire = 'Fire',
    Ghost = 'Ghost',
    Ice = 'Ice',
    Metal = 'Metal',
    Neutral = 'Neutral',
    Plant = 'Plant',
    Poison = 'Poison',
    Psychic = 'Psychic',
    Stone = 'Stone',
    Water = 'Water'
};

// Mutations are exclusively for moves
type mutation = {
    type: MonType
}

// DynaBase

// If any time you want to switch from a script type it needs to be cleared, 
// then you might as well not be able to switch

export default function ScriptConfigPanel(props : VoidProps<{back: ()=>void}>){
    //const [entryOptions, setEntryOptions] = createSignal(ScriptType[0]);
    const [scriptType, setScriptType] = createSignal(ScriptType.None);
    const [moveMutations, setMoveMutations] = createStore([] as mutation[]);
    const [menuExpanded, setMenuExpanded] = createSignal(false);
    // types.forEach((value)=>{console.log(value);})

    const onChange = (e : Event) => {
        console.log(e);
        //let optionIndex = options.find((e) => e);
        
        /*
        let optionIndex = indexOf(e.value);

        console.log(optionIndex)
        setEntryOptions(optionIndex);
        selectedOption = optionIndex;
        */
    }

    const onSubmit = (e : Event) => {
        console.log("Submit");
        console.log(e);
    };


    const ToggleMenu = () => {
        let btn = document.getElementsByClassName("form-expand-button")[0] as HTMLElement;
        setMenuExpanded(!menuExpanded());
        
        if(menuExpanded()){
            animate(".form-container",{
                "translateX": "45vw"
            });

            btn.innerText = "Collapse";
        }
        else{
            animate(".form-container",{
                "translateX": "-5vw"
            });
            
            btn.innerText = "Expand";
            
        }
    }


    const AddMutation = () => {

        const newMutation : mutation = {
            type: MonType.None
        }

        setMoveMutations([...moveMutations, newMutation])

        console.log("Added Move Mutation");

    };

    // Prototype of database submission method (Test Method)
    const ToJson = () => {

        console.log(moveMutations);
        /**
         * name
         * types
         * description
         * 
         * 
         */

        
    }

    const ToDataBase = () => {
        // Send a push request to server
        // Responds with a unique id on first time
    }

    const ChangeScriptType = (e : string) => {
        if(scriptType() != ScriptType.None){
            // Check if any data has been added
            // If data was added, display a confirmation message
            return;
        }
        if (e == null){
            setScriptType(ScriptType.None);
            return;
        }
        const _sc = ScriptType[e as keyof typeof ScriptType];

        setScriptType(_sc);
    }

// Also include overlay to detect
    return(
        <div class="form-container">
            <form class="form-data-container">
                <label>Name </label>
                <input placeholder='Name' value={"Hello"} id="dyna-name"></input>
                <img id="name-check" src={check_img}  class='no-select'></img>
            

                <hr id="base-separator"/>
                
                <div>
                    <ul>
                        <For each={moveMutations}>{(val, i) =>
                            <li>
                                
                            </li>
                        }
                        </For>
                    </ul>
                </div>
                    
                <Show when={true}>
                    <button name="btn-add-mutation" class="click-button" onClick={AddMutation}> + </button>
                </Show>

                <button class='click-button' onclick={ToJson}>
                    Export
                </button>
                
                <button class='click-button' onclick={ToJson}>
                    Save
                </button>
            </form>

            <button class="form-expand-button" onclick={ToggleMenu}>Expand</button>
        </div>
    );
}
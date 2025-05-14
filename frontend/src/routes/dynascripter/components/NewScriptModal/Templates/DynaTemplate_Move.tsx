import { JSX, Match, Switch, VoidProps, createEffect, createSignal } from "solid-js"
import { PresentationButton } from "../../../../../components/PresentationSchemes/PresentationSchemes"

import stethoscope_icon from '../../../../../resources/stethoscope.png';
import sword_icon from '../../../../../resources/Sword-02-256.png';
import wand_icon from '../../../../../resources/Wand-01-256.png';
import { EditorInit } from "../../../ScriptEditor/EditorInit";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import { EditorInitParams, SetEditorInitParams } from "../../../ScriptEditor/editor.data";
import { addEventListener } from "solid-js/web";


export default function DynaTemplate_Move(props : VoidProps<{}>) : JSX.Element {

    const [TemplatePage, SetTemplatePage] = createSignal(0);

    const  editorSettings : EditorInit = {} as EditorInit;

    enum Types{
        None, Attack, Status, Physical, Special
    }

    //addEventListener()


    let _type : Types[] = [];

    return(
        
        <div class="template-page-container">
            <Switch>
                <Match when={TemplatePage() == 0}>
                    <h1>Pick a Move Category</h1>
                    <div style={{display:"flex"}}>

                        <PresentationButton img_src={sword_icon} click_func={() => {
                            
                            _type.push(Types.Attack);
                            SetTemplatePage(1);
                            
                        }} label="Attack"
                            hintText="This is an attack, it is how you hit things in battle."
                        />


                        <PresentationButton img_src={stethoscope_icon} click_func={() => {
                            
                            //linkAppend_1 = linkPager.Status;
                            _type.push(Types.Status);
                            SetTemplatePage(1);
                            
                        }
                         
                         }  label="Status"  
                            hintText="Status moves are attacks that don't do damage."
                         />

                    </div>
                </Match>


                <Match when={TemplatePage() == 1}>
                    <Switch>
                        <Match when={(_type[0] as Types) == Types.Attack}>
                            <h1>Select an Attack Type</h1>
                            <div style={{display:"flex"}}>

                                <PresentationButton img_src={sword_icon} click_func={() => {_type.push(Types.Physical); SetTemplatePage(2)}} label="Physical"  
                                    hintText="Physical attacks make use of the Attack state and the target's defense stat... (Unless otherwise stated)"
                                />
                                <PresentationButton img_src={wand_icon} click_func={() => {_type.push(Types.Special); SetTemplatePage(2)}} label="Special"
                                    hintText="Special attack utilize the Special Attack stat and target the Special Defense stat... (Unless otherwise coded)"
                                />

                                

                            </div>

                        </Match>
                        <Match when={(_type[0] as Types) == Types.Status}>
                            <h1>Attack</h1>
                            <div style={{display:"flex"}}>

                                <PresentationButton img_src={sword_icon} click_func={() => _type[0] = Types.Attack} label="Attack"
                                    hintText=""
                                />
                                
                                {/** Send navigate to on submit */}
                                <EntryForm/>

                            </div>

                        </Match>
                    </Switch>

                </Match>
            
                <Match when={TemplatePage() == 2}>
                    <Switch>
                        <Match when={(_type[0] as Types) == Types.Attack}>
                            <EntryForm />
                        </Match>
                    </Switch>

                    
                </Match>

            </Switch>
            

            
            
        </div>
    )

    function EntryForm(){
    
        interface FormEntryData{
    
        }
    
        const navigate = useNavigate();
    
        function SubmitForm(e : SubmitEvent){
            console.log(e);
            console.log(typeof(e));
            
            console.log(e.submitter)

            e.preventDefault();
            
            SetEditorInitParams({
                category : "Move",
                subType : _type.map(_t => {return Types[_t]}),
                name : editorSettings.name
            }
                
            )
            
            navigate('editor');
    
            console.log("Hi, I'm in the new editor now");
    
        }

        function BlockEnterKey(e : KeyboardEvent){

            if(e.key === 'Enter'){
                console.log("Enter detected");
                e.preventDefault();
            }
        }
    
        return(
            <form onsubmit={SubmitForm} onkeypress={BlockEnterKey}>
                <label for="name_field" >Name: </label>
                <input id="name_field" type="text" oninput={e=>editorSettings.name = e.target.value}></input>

                <label for="type_field" >Type: </label>
                <input id="type_field" type="text" oninput={e=>editorSettings.data}></input>

                <button>Finish</button>
                <button>Go To Editor</button>
            </form>
        )
    }
}

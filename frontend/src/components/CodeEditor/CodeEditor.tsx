import { Input, Select } from "@thisbeyond/solid-select";
import { createSignal, createEffect, For, Switch, Match} from "solid-js";
import {createStore} from "solid-js/store";
import {Command} from "../Command";
import './CodeEditor.scss';

enum SetupVariable{
    None,
    InflictStatus,
}

enum SetupMoveVariable{
    SetPriority,
    SetCritRate,
    DealDirectDamage
    
}

enum EventFunctions{
    None,
    NegateDamage,
    
}

enum EventPrefixValues{
    On,
    Before,
    After
}
enum EventSubjectValues{
    Battlefield,

}

enum EventPassageConditionValues{
    Enter,
    Exit
}

enum EventConditionValues{
    Damage
}

type DynaEvent = {
    prefix: string
    subject: string
    condition: string
    
    commands: Command[]
}

type SetupAction = {
    targetVariable : SetupVariable
    setValue : string
}

type Command = {
    name : string
    nextCommand: Command|null
}

export default function CodeEditor(){
    enum Tab {SetupTab, EventTab};
    
    const [selectedTab, SetSelectedTab] = createSignal(Tab.SetupTab);
    const [setupList, setSetupList] = createStore([] as SetupAction[]);
    const [eventList, setEventList] = createStore([] as DynaEvent[])


    createEffect(() => {
        console.log("Effect played");
    })

    const AddSetupBlock = () => {
        console.log("A command was just added");

        const newSetupBlock : SetupAction = {
            targetVariable: SetupVariable.None,
            setValue: ""
        }

        setSetupList([...setupList, newSetupBlock])
    }

    const DeleteSetupBlock = (index : number) => {
        setSetupList(setupList.filter((_,i) => i != index));
    }

    const AddEvent = () => {
        // grab id to update event
        console.log("Event was added")

        const newEvent : DynaEvent = {
            prefix: "",
            subject: "",
            condition: "",

            commands: []
        }

        setEventList([...eventList, newEvent])
    }

    const AddEventCommand = (de : DynaEvent, di : number) => {

        const newCommand : Command = {
            name: "Empty",
            nextCommand: null
        }

        setEventList(di, 'commands', [...de.commands, newCommand])

    }



    function CommandChange(e : keyof typeof SetupVariable, index : number): void {

        if(e === null) return;

        setSetupList(index,{targetVariable : SetupVariable[e]})

        // This line works, typescript is just verbose
        console.log(SetupVariable[e]); 
    }

    return(
        <div class="code-editor-container">
            <div class="code-editor-select-container">
                <button class={selectedTab() == Tab.SetupTab ? "selected-tab" : ""} onclick={() => SetSelectedTab(Tab.SetupTab)}>Setup</button>
                <button class={selectedTab() == Tab.EventTab ? "selected-tab" : ""} onclick={() => SetSelectedTab(Tab.EventTab)}>Events</button>
            </div>

            <div id="code">
                <Switch>
                    <Match when={selectedTab() == Tab.SetupTab}>
                        <p>Setup Tab</p>
                            <For each={setupList}>{(value, index) => 
                                <li>
                                    <span class="setup-container">
                                        <button onclick={() => DeleteSetupBlock(index())}>-</button>
                                        <Select 
                                            onChange={(e) => CommandChange(e,index())} 
                                            initialValue={value.targetVariable > 0? SetupVariable[value.targetVariable] : null}
                                            options={Object.values(SetupVariable).filter((v) => isNaN(Number(v)))} 
                                            placeholder={ "Select an event"}
                                            />
                                        <input name="" id="" value={value.setValue}/>
                                     </span>
                                </li>
                            }</For>

                        <button class="click-button" onClick={() => AddSetupBlock()} textContent="+"/>
                    </Match>

                    <Match when={selectedTab() == Tab.EventTab}>
                        <For each={eventList}>{
                            (value, index)=>
                            <li class="event-block">
                                {/*Make each iteration a select*/}
                                <span class="event-container">
                                    {/* Pre */}
                                    <Select 
                                        options={Object.values(EventPrefixValues).filter(e => isNaN(Number(e)))}
                                        onChange={(e) => setEventList(index(), {prefix : e})}
                                        initialValue={value.prefix != null? value.prefix : null}
                                        placeholder={"Prefix"}
                                        />
                                    {/* Condition */}
                                    <Select 
                                        options={Object.values(EventSubjectValues).filter(e => isNaN(Number(e)))}
                                        onChange={(e) => setEventList(index(), {subject : e})}
                                        initialValue={value.subject != null? value.subject : null}
                                        placeholder={"Subject"}
                                        />
                                    {/*Make each iteration a select*/}
                                    <Select 
                                        options={Object.values(EventPassageConditionValues).filter(e => isNaN(Number(e)))}
                                        onChange={(e) => setEventList(index(), {condition : e})}
                                        initialValue={value.condition != null? value.condition : null}
                                        placeholder={"Value"}
                                        />
                                </span>

                                <div class="command-container">
                                    {/* Container for actual commands */}
                                    <For each={value.commands}>{

                                        (cmdVal, cmdIndex) => 
                                            <li>
                                                <span class="subcommand-container">
                                                    {cmdIndex}. Ayyy
                                                </span>
                                            </li>
                                        
                                    }
                                    </For>
                                </div>

                                <button class="add-event-command-button" onclick={() => AddEventCommand(value,index())}>+</button>
                            </li>
                        }

                        </For>
                        <button class="click-button" onClick={AddEvent}> + </button>
                    </Match>
                </Switch>
            </div>

        </div>
    )

}
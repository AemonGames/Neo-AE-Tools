import { For, JSX } from 'solid-js';
import { languages, setLanguage } from '../../../common';
import { ClearData } from '../data';
import './options.scss'

export default function Options() : JSX.Element{

    let sub_func : () => void;


    function HideConfirmation(){
        let confirmationBox : HTMLElement | null = document.getElementById("confirmation");
        if(confirmationBox == null){
            console.error("Confirmation box could not be found");
            return;
        }
        console.log(confirmationBox);
        confirmationBox.style.visibility = "hidden";
        
    }
    
    function DisplayConfirmation(msg : string, submit_function : () =>  void) : void{
        
        let confirmationBox : HTMLElement | null = document.getElementById("confirmation");
        let confirmationQuery : HTMLElement | null = document.getElementById("confirmation-query");
        if(confirmationBox == null || confirmationQuery == null){
            console.error("Confirmation box or query could not be found");
            return;
        }
        sub_func = submit_function;

        confirmationBox.style.visibility = "visible";
        confirmationQuery.innerText = msg;
        // set visibility
    }

    function RunSubmitFunction(){
        console.log(sub_func);
        if(sub_func != undefined){
            sub_func();
        }
        CancelSubmitFunction();
    }
    
    function CancelSubmitFunction(){
        sub_func = () => {};
        HideConfirmation();
        //console.log(sub_func);
    }

    return(
        <div id="options-menu" class="viewport">

            <div id="confirmation">

                <div id="confirmation-message"> 
                    <h2 id="confirmation-query">Are you sure?</h2>

                    <div id="confirmation-button-container">
                        <button class="options-button" onClick={CancelSubmitFunction}>No Way!</button>
                        <button class="options-button" onClick={RunSubmitFunction}>OK!</button>
                    </div>
                </div>
            </div>

            <h1>Options</h1>
            
            <div id="options-list">
                <div>
                    <h3>Language</h3>
                    <For each={languages}>{(value, index) => 
                        <button onClick={() => setLanguage(value)}>{value}</button>
                    }</For>
                </div>

                <div>
                    <h3>Themes</h3>
                    
                    <button onClick={() => alert("Changing theme")}>Dark Mode</button>
                    <button onClick={() => alert("Why would you do this???")}>Light Mode</button>
                </div>

                <div>
                    <h3>Data</h3>
                    <button onClick={() => DisplayConfirmation("This is a message", ClearData)}>Clear Data?</button>
                    <button onClick={() => print()}>Export Data</button>
                </div>


            </div>



        </div>
    )
}
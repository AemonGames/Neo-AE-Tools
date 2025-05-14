import { createSignal, JSX, VoidProps } from 'solid-js';
import {
    animate,
    createTimeline,
    createTimer,
    // ...other methods
  } from 'animejs';

import { languages, language as lang,setLanguage as langSet } from '../../common';
import "./intro.scss"
import { VoidComponent } from 'solid-js/types/render';
import { introDialogueDE, introDialogueEN, introDialogueJP } from './IntroDialogues';

export default function Intro(props : VoidProps<{setFlag : () => void}>){
    const [introState, setIntroState] = createSignal(0);

    const introDialogues = {
        EN: introDialogueEN,
        DE: introDialogueDE,
        JP: introDialogueJP
    }

    function GetNextDialogue() : void{
        setIntroState(state =>  state + 1);

        // End tutorial

        let _lang : string = lang();
        console.log(introDialogues["EN"]);

        let selectedDialogueSet : string[] = introDialogues[_lang as keyof typeof introDialogues];

        if(introState() > selectedDialogueSet.length - 1){

            // Function causes too many rerenders??? (sure I guess)
            let intro = document.getElementById("intro");
            if(intro == null){
                console.error("Intro element could not be found");
                return;
            }
            intro.style.display = "none";
            props.setFlag();
            //setCommon(18);
        }

        animate('#intro-next-button', {
            translateX:[
                {value: 20, duration: 300, delay: 20},
                {value: 0, duration: 400, delay: 20}
            ],
            rotate: '1turn',
        });
    }

    function GetPrevDialogue() : void {
        setIntroState(state =>  state - 1);

        animate('#intro-prev-button', {
            translateX:[
                {value: -20, duration: 300, delay: 20},
                {value: 0, duration: 400, delay: 20}
            ],
            rotate: '1turn',
        });
    }

    return(
        <>
            <div id='intro' class="viewport">
                <h1 id="intro-text">{introDialogues[lang() as keyof typeof introDialogues][introState()]}</h1>
                <div id="intro-button-container">
                    <button id="intro-prev-button" disabled={introState()===0} onClick={GetPrevDialogue} class="click-button"> Back </button>
                    <button id="intro-next-button" onClick={GetNextDialogue} class="click-button"> OK </button>
                </div>
                <h3>{introState()}</h3>
            </div>

            <div id="lang-select-container">
                {/*<ReactDropdown options={language} value={lang} onChange={e => langSet(e.value)}/>*/}
            </div>
        </>
    );
}


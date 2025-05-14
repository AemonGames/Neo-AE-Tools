import logo from '../../resources/okaymon_logo_v5_color.png';
import {
    animate,
    createTimeline,
    createTimer,
    // ...other methods
  } from 'animejs';
import { versionNumbers } from '../../common';
import './header.scss';
import { Component, VoidComponent, VoidProps, createEffect } from 'solid-js';
import { JSX, Show, Switch, Match } from 'solid-js';
import { A } from '@solidjs/router'

export default function Header(props : VoidProps<{arg:string}>):JSX.Element {


    const animateLogo = () => {
        console.log("Animating");
        animate("#logo", {
            translateX:[
                {value: 20, duration: 300, delay: 20},
                {value: 0, duration: 400, delay: 20}
            ],
            //rotate: '1turn'
            }
        );
    }


    return(
    <header class="App-header"
        
        style={
            props.arg == "dynascripter"? {"background-color": "rebeccapurple"}:
            props.arg == "monstruct"? {"background-color": 'rgb(51, 85, 153)'} : ""
    }

        >
    <div onMouseOver={animateLogo}>
        <a href='/'>
        <img id="logo" src={logo} class="App-logo" alt="Okaymon-Logo"/>
        </a>
    </div>
    <h1 onMouseOver={() => console.log("Hover Detected")}>
        <Switch>
            {/* Take values from somewhere else later */}
            <Match when={props.arg == "dynascripter"}>
                DynaLang Scripter 
            </Match>
            
            <Match when={props.arg == "monstruct"}>
                <A href='monstruct'>
                    Monstruct 

                </A>
            </Match>
        </Switch>
            v{versionNumbers[props.arg]}
    </h1>
    </header>
    )
}
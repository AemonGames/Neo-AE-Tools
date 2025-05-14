import { createSignal } from 'solid-js';


export let common = 13;

export const versionNumbers : {[app:string]:string} = {
    'dynascripter' : '0.02a',
    'monstruct' : '0.01a',
    'battlebrew' : '0.01a',
    'globlot' : '0.01a',
    'questforge' : '0.01a',
    'shopkeep' : '0.01a',
    'statstyler' : '0.01a',
    'taleweaver' : '0.01a',
}

export enum Language{
    EN,
    DE,
    JP
}
export const languages : Array<string> = Object.keys(Language).filter(val => Number.isNaN(Number.parseInt(val)));

export const serverURL = import.meta.env.VITE_BACKEND_SERVER_URL;

export const [language, setLanguage] = createSignal(languages[0]);
export const [settings, setSettings] = createSignal({});

const saveString = "okay-dev-dyna";

export function LoadSettings(){
    let obj : string | null = window.localStorage.getItem(saveString);
    if(obj == null)
        return;

    setSettings(obj);
}

export function SaveSettings(){

    let data = settings();
    let data_string : string = JSON.stringify(data);

    window.localStorage.setItem(saveString, data_string);
}

export function setCommon(value : number){
    common = value;
}

export const AppStates = {
    "Intro" : 0,
    "Selector" : 1,
    "Search" : 2,
    "Create" : 3
}



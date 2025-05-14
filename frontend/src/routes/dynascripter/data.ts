import {createStore} from 'solid-js/store';

const dataKey : string = "OkaymonDevDynaScripter"

const defaultDataValues = {
    introSkip: false, 
    userID: null,
    theme: "dark"
}

export const [data, setData] = createStore(structuredClone(defaultDataValues));



export function ClearData() : void{
    //setData(structuredClone(defaultDataValues));
    //localStorage.removeItem(dataKey);
    console.log("Data has been cleared");
}

export function LoadData() : void{
    let _data = localStorage.getItem(dataKey);
    if(_data === null){
        console.log("Data could not be loaded");
        return;   
    }

    // Parse Data
    let parsedData = JSON.parse(_data);

    setData(parsedData);
    console.log("Data has loaded successfully");
    console.log(parsedData);
}

export function SaveData() : void{
    localStorage.setItem(dataKey, JSON.stringify(data));
    console.log("Data has been saved");
}
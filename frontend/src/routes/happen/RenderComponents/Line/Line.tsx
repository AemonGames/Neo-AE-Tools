import { createEffect } from "solid-js";
import './line.scss';


export default function(props : {ownerID : string, startPoint : HTMLElement, endPoint? : HTMLElement}) {

    let line : HTMLHRElement;

    function CalculateLine(startPoint : HTMLElement, endPoint? : HTMLElement){

        if(!endPoint){
            // Make some line clearing code here
            console.log("No endpoint");
            return;
        }
        // Check this calculation,
        let x1 = startPoint.offsetLeft + startPoint.offsetWidth/2;
        let y1 = startPoint.offsetTop + startPoint.offsetHeight/2;
        let x2 = endPoint.offsetLeft + endPoint.offsetWidth/2;
        let y2 = endPoint.offsetTop + endPoint.offsetHeight/2;

        let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        let length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

        if(line){
            line.style.left = x1 + "px";
            line.style.top = y1 + "px";
            line.style.width = length + "px";
            line.style.transform = "rotate(" + angle + "deg)";
        }
    }

    createEffect(()=> {
        console.log(props.endPoint);
        CalculateLine(props.startPoint, props.endPoint);
    });

    return(
        <hr ref={line!} class="line"/>
    )
}
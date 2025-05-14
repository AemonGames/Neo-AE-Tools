import { JSX, VoidProps } from "solid-js";
import "./MonsterTicket.scss";
import { useNavigate } from "@solidjs/router";
import { GenerateImageLink } from "../../../serverFunctions";
import { MonsterCard } from "../../../../../lib/types";

export default function MonsterTicket(props: VoidProps<{monsterRecord : MonsterCard, isClickable? : boolean}>) : JSX.Element{

    const navigate = useNavigate();

    function GoToEditor(){
        if(!props.isClickable) return;
        navigate("edit?name="+props.monsterRecord.name);
    }

    return(
        <div class={"monster-ticket-container " + (props.isClickable? "monster-ticket-clickable" : "")} onclick={GoToEditor}>
            <img src={GenerateImageLink(props.monsterRecord.id, props.monsterRecord.image)}/>
            <h1>{props.monsterRecord.name}</h1>
        </div>
    )
}


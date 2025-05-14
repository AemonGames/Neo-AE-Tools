import {For, JSX, Suspense, createEffect, createResource, createSignal} from "solid-js";
import './dashboard.scss';
import { PresentationButton, PresentationLink } from "../../../components/PresentationSchemes/PresentationSchemes";

import create_img from "../../../resources/File-add-256.png";
import MonsterTicket from "../../../components/monstruct/MonsterTicket/MonsterTicket";
import { GetRecentMonsterTickets } from "../../../serverFunctions";

export default function DashBoard() : JSX.Element {
    
    const [recentMonsterTickets] = createResource(GetRecentMonsterTickets);

    const [SearchValue, SetSearchValue] = createSignal();

    return(
        <div class="monstruct-bg">
            <div class="dashboard-toolbar">
                <ul>
                    <li>
                        <PresentationLink label="Create" href="create" isNavLink img_src={create_img}/>
                    </li>
                    <li>
                        <PresentationLink label="Edit" href="manage" isNavLink img_src={create_img}/>
                    </li>
                    <li>
                        <PresentationLink label="Profile" href="profile" isNavLink img_src={create_img}/>
                    </li>
                    <li>
                        <label for="monstruct_search_bar">Search</label>
                        <input id="monstruct_search_bar"
                            onchange={val => {
                                console.log(val);
                                if(val.target.value.length > 0){
                                    console.log("Valid content");
                                }
                                else{
                                    console.log("Empty")
                                }
                                console.log(val.target.value);
                                SetSearchValue(val.target.value);
                            }}
                        />
                    </li>
                </ul>
            </div>

            <div class="monster-ticket-board-interface">

                <div class="monster-ticket-board-menu">
                    <ul>
                        <li>
                            <PresentationLink label="Recent"   href="create" isNavLink img_src={create_img}/>
                        </li>
                        <li>
                            <PresentationLink label="Featured" href="manage" isNavLink img_src={create_img}/>
                        </li>
                        <li>
                            <PresentationLink label="Popular" href="profile" isNavLink img_src={create_img}/>
                        </li>
                    </ul>
                </div>
                
                <div class="monster-ticket-board-container">
                    <h1>Recent</h1>

                    <Suspense fallback={<h1>Loading</h1>}>

                    <div class="monster-ticket-board">
                        <For each={recentMonsterTickets()}>
                            {(monster) => (
                                <MonsterTicket monsterRecord={monster} isClickable/>
                            )}
                        </For>    
                    </div>
                    
                    </Suspense>  

                </div>
            
            </div>
                
            
            
        
        </div>
    )
}
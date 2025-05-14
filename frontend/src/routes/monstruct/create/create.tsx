
import { Accessor, Component, For, JSX, Match, Setter, Show, Switch, VoidProps, createEffect, createResource, createSignal } from 'solid-js';
import './create.scss';
import { createStore } from 'solid-js/store';
import { serverURL } from '../../../common';
import { Select, createOptions } from '@thisbeyond/solid-select';
import axios, { HttpStatusCode } from 'axios';
import { GetMonsterTypes, SubmitCreature } from '../../../serverFunctions';
import { Monster, EstimateMonStats, CreateMonsterRequest } from '../../../../../lib/types';
import { PageFive, PageFour, PageOne, PageSix, PageThree, PageTwo } from './pages';
import { LoadCircle } from '../../../components/LoadCircle/LoadCircle';
import { useNavigate } from '@solidjs/router';




export default function Create() {

    const [formData, SetFormData] = createStore<CreateMonsterRequest>({'base_stats' : {}, 'ev_yield' : {}, 'abilities' : [] as string[] } as CreateMonsterRequest);

    
    const [ActivePageIndex, SetActivePage] = createSignal<number>(0);

    const pages : JSX.Element[] = [
        PageOne(SetFormData, formData), 
        PageTwo(SetFormData), 
        PageThree(SetFormData), 
        PageFour(SetFormData), 
        PageFive(SetFormData),
        PageSix(SetFormData),
        SubmissionPage()
    ]

    // Pull abilities and use this to encapsulate
    const pto = createOptions([]);

    // Values should range from true (active), false (inactive) and undefined (loading)
    const [IsFormActive, SetFormActive] = createSignal<boolean|undefined>(true);

    return(
        <div>
            <Switch fallback={<LoadCircle />}>

                <Match when={IsFormActive() == true}>
                    <div class="page-display-container">
                        <For each={pages}>{(val,ind) =>(
                            <div class={"circle " + (ind() == ActivePageIndex()? "active-page" : "")}>
                                {ind()+1}
                            </div>
                        )}
                        </For>
                    </div>

                    <div class="ticket-container">


                        <form>

                        <FormDisplay></FormDisplay>
                            
                            <div>
                                <ProgressButton direction={-1}/>
                                <ProgressButton direction={ 1}/>
                            </div>

                        </form>

                    </div>

                </Match>

                <Match when={IsFormActive() == false}>
                    <div>
                        <h1>Form Submitted</h1>
                    </div>
                </Match>

            </Switch>

        </div>
    )

    function SubmissionPage(){

        return(
            <div>
                <LoadCircle/>
            </div>
            )
    }

    function ProgressButton(props : VoidProps<{ direction : number, }> ) : JSX.Element {
        //if(props.direction == undefined) props.direction = 1;  
        
        let btn : HTMLButtonElement;
        const navigate = useNavigate();

        async function HandleProgression(e : MouseEvent, direction : number){
            e.preventDefault(); 
    
            if(direction > 0){
                if(ActivePageIndex() > pages.length - 3 ){
                    console.log("Submitting");
                    SetFormActive(undefined);
                    try{
                        const result = await SubmitCreature(formData);
                        SetFormActive(false);
                        navigate(`../edit?name=${formData.name}`);
                    }
                    catch{
                        SetFormActive(true);

                    }
                    

                    return;
                }
                SetActivePage(old => old + 1);
            }
            else{
                if(ActivePageIndex() <= 0) return;
                SetActivePage(old => old - 1);
            }
        }
        
        function GetButtonName(){
            if(props.direction > 0)
                return (ActivePageIndex() < pages.length -2)? "Next" : "Finish";
            else
                return (ActivePageIndex() == 0)? "N/A" : "Previous";
        }

        return(
            
            <button

                onclick={ e => HandleProgression(e, props.direction)}

                disabled={(props.direction < 0 && ActivePageIndex() == 0) || ActivePageIndex() < 0}
            
                textContent={GetButtonName()}
            />
        )
    }

    function FormDisplay(){
        
        createEffect(()=>{
            // Check for validity
            if(ActivePageIndex() > pages.length){
                // Throw an error
                console.error("Active page index exceeds length of page array");
            }
            
            // Display only the active page
            pages.forEach((val, index) => {
                let castedVal = val as HTMLDivElement

                if(index == ActivePageIndex())
                    castedVal.style.display = "block"
                else
                    castedVal.style.display = "none";
            })

        })



        // should set display of inactive page

        return(
            <div class='page'>
                <For each={pages}>{(item, index)=>(item)}</For>
            </div>

        )
    }

    
}
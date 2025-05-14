import { For, JSX, Match, Show, Switch, VoidProps, createEffect, createSignal } from "solid-js";

export default function SearchScreen() : JSX.Element{

    const [QueryValue, SetQueryValue] = createSignal<null | string>(null);

    createEffect(()=>{
        console.log("Loaded");

        // Get url parameters (The toString part is just to get typescript to shut up)
        let urlParams : URLSearchParams = new URL(document.location.toString()).searchParams;

        let query = urlParams.get("q");
        if(query == null){
            SetQueryValue(null);
            return;
        }
        
        console.log("Non Null Query");
        console.log(query);
        SetQueryValue(query);
        console.log(urlParams);
    })

    function backToPrevious(){
        window.location.assign("..");
    }

    async function searchFor(x : any){
        // Sends an api call to server to get string
        // reads value from input tag

        console.log(x);

        const backendURL = import.meta.env.VITE_BACKEND_SERVER_URL;

        const res = await fetch(`${backendURL}/api/s/?q=${QueryValue()}`);
        const ext = await res.json();

        console.log(ext);
    }

    return(
        <div id="search-screen" class="viewport">
            <div>
                <Switch>
                    <Match when={QueryValue()}>
                        Hi
                    </Match>

                    <Match when={QueryValue() == null}>
                        <h1>Search</h1>
                        <form>
                            <input></input>
                            <button onClick={searchFor}>Search</button>
                        </form>
                        <button onClick={backToPrevious}>Back</button>
                    </Match>
                </Switch>
                
            </div>
        </div>
    )


        function SearchResults(props: VoidProps<{term : string}>) : JSX.Element{

            // Lowercase, trimmed
            let formattedTerm = "";

            // Doesn't display for some reason
            const matches = ["Blaze A", "Blaze B"];

            let matchData = {
                category: "",
                Content: ""
            }
            return(
                <>
                    <h1>x Results for {props.term} found.</h1>
                    <div>
                        <ul>
                            <For each={matches}>{(value, index) =>{
                                return(
                                    <li>
                                        <h2>{value}</h2>
                                        <hr/>
                                    </li>
                                )
                            }}
                            </For>
                        </ul>
                    </div>
                </>
            );
        }

}
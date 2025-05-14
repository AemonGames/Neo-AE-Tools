import { Accessor, For, JSX, Setter, Show, VoidProps } from "solid-js";
import { mapLayers, AdjustUserSettings, UserSettings } from "../data/stores";

export function LayerList(props : VoidProps<{
    lastSelectedLayerDiv : HTMLDivElement
}>) : JSX.Element{


    return(
        <For each={mapLayers}>{(layer, layerIndex) =>{
                        
            let currentLayerElement : HTMLDivElement
            let selectedClass : string = "layer-selected";
            return(

                
                <div ref={currentLayerElement!} class={"map-layer-list-item" } onclick={(event) => {

                    if(event.target != event.currentTarget){
                        // Prevent children from triggering event
                        return;
                    }

                    AdjustUserSettings("currentLayer", layerIndex);
                    console.log(`Active Layer set to ${layer.name} (${UserSettings.currentLayer})`);
                    currentLayerElement.classList.add(selectedClass);
                    
                    if(props.lastSelectedLayerDiv != undefined) props.lastSelectedLayerDiv.classList.remove(selectedClass);
                    props.lastSelectedLayerDiv = currentLayerElement;

                }}
                
                >
                <div>
                    <Show when={layer.isVisible} fallback={<>X</>}>
                        O
                    </Show>
                </div>

                <div>
                    {layer.name}
                </div>

                <div class="layer-control-buttons">
                    <button>A</button>
                    <button>B</button>
                    <button onclick={() => {alert(`Layer (${layer.name}) has been deleted.`)}}>C</button>
                </div>
                        
            </div>
        )
        }

    }
    
        </For>
    )
}
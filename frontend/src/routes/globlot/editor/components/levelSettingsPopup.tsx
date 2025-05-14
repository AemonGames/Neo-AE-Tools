import Dismiss from "solid-dismiss";
import { Accessor, Setter, VoidProps } from "solid-js";

export let levelPopupMenu : HTMLDivElement;


export default function LevelSettingsPopup(props : VoidProps<{
    LevelMenuButton : HTMLButtonElement,
    GetLevelMenuPopup : Accessor<boolean>,
    SetLevelMenuPopup : Setter<boolean>

}>){

    return(
        <Dismiss
            menuButton={props.LevelMenuButton}
            open={props.GetLevelMenuPopup}
            setOpen={props.SetLevelMenuPopup}
        >
        <div class="level-settings-popup-menu" ref={levelPopupMenu!}>
            
            <div class="level-settings-popup-header">
                <span>
                    Project Settings
                </span>
                <button>
                    X
                </button>
            </div>

            <div class="level-settings-popup-main">

                <label  for="Name">Name</label>
                <input name="Name" type="text"></input>
                
                <label  for="Description">Name</label>
                <input name="Description" type="text"></input>
                

                {/* Tile size will likely be pulled from a database */}
                {/* <label  for="TileSize">Name</label>
                <input name="TileSize" type="text"></input> */}
                {/*In practice, this really means brush size  */}

            </div>


            <div class="level-settings-popup-footer">
                <button>OK</button>
                <button>New</button>
                <button>Save</button>
                <button>Load</button>
            </div>


        </div>
        </Dismiss>
    )
}


export function ShowLevelPopupMenu(){

    //levelPopupMenu.style.visibility = "visible";
    levelPopupMenu.classList.toggle("show");
    

}



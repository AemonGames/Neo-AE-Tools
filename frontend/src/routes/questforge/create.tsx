import { JSX } from "solid-js";
import { Select } from "@thisbeyond/solid-select";
import "./create.scss";

export default function Editor() : JSX.Element{

    // Some features are linked, meaning they rely on another tool to function
    // Each linked element should be indicated regardless of application
    
    // This is the quest editor
    // Define objectives here
    // Set flag / checkpoint management and rules here
    // Add NPC dialogue overrides here (linked)
    // Add custom NPC / Objects (linked)
    // 
    

    return(
        <div>

            <div class="action-menu">
                <h3>Actions</h3>

                <div class="action-container">
                    {/* Maybe add templates here? */}

                </div>
            </div>
            
            <div>

            </div>
            
            <div>

            </div>
            
            <div>

            </div>
            
        </div>
    )
}

// Move to Components later
// Initial Template DIalogue Menu
export function CreateQuestMenu(){

    // Should actually go to the editor once completed

    async function SubmitQuest(){

    }

    return(
        <form>
            <label for="title">Title:</label>
            <input type="text" id="title"></input>
            
            <label for="description">Description:</label>
            <input id="description"></input>




            <h3>Rewards</h3>

            <div class="reward-container">
                
            </div>

        </form>

    )
}
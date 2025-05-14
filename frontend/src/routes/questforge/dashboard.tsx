import { JSX, Show } from "solid-js";
import "./dashboard.scss";
import { PresentationLink } from "../../components/PresentationSchemes/PresentationSchemes";


export default function Dashboard() : JSX.Element{

    const displayOverlay = false;

    // The dashboard should include social elements as well as a brief recap
    // of what the user has done recently
    // It should be a gateway to collaborate and 

    return(
        <div class="main-window">

            <Show when={displayOverlay}>

                <div class="blocker-window">
                    
                    <div>
                        Content to show
                    </div>

                </div>

            </Show>

            <div class="account-display">
                I guess an icon should go here
            </div>

            <div class="sidebar">

                <PresentationLink
                    href="create"
                    label="New Quest"
                    img_src=""
                ></PresentationLink>

                <div class="quest-display">
                    <h2>Quests</h2>
                    <ul>
                        <li>
                            This should loop with content and quick links
                        </li>
                    </ul>
                </div>

                <div class="help">
                    Help
                </div>


            </div>

            <div class="">

            </div>
        </div>
    )
}
import icon_new from "../../../resources/File-add-256.png"
import icon_search from "../../../resources/Data-Find-256.png"
import icon_book from "../../../resources/Book-Open-256.png"
import icon_gear from "../../../resources/Gear-256.png"


import './menu.scss';
import { createSignal, JSX } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { PresentationLink, PresentationButton } from "../../../components/PresentationSchemes/PresentationSchemes";
import { NewScriptModal } from "../components/NewScriptModal/NewScriptModal";
import { Portal } from "solid-js/web";

export default function MainMenu():JSX.Element{

    const [modalOpen, setModalOpen] = createSignal(false);
    

    return(
        <div id="selector" class="viewport">
            

            <PresentationButton img_src={icon_new} label="Create New" click_func={()=>setModalOpen(true)} hintText="Create a new battle thing"/>
            <PresentationLink img_src={icon_search} label="Search" href="search"/>
            <PresentationLink img_src={icon_book} label="Tutorial" href="tutorial"/>
            <PresentationLink img_src={icon_gear} label="Options" href="options"/>

            <Portal>
                {modalOpen() && <NewScriptModal onClose={() => setModalOpen(false)} />}

            </Portal>

        </div>

    )
}
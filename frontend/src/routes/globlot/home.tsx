import { PresentationLink } from "../../components/PresentationSchemes/PresentationSchemes"

export default function Globlot_Home(){

    /**
     * Globlot is the mapping tool
     * Globe x Blot should vaguely mean making a mark on the world
     */

    return(
        <main>
            <h1>Globlot</h1>
            <h2>Make your mark on the globe</h2>
        
            <PresentationLink href="editor" img_src="" label="New" />

            <button>
                Other
            </button>
            
        </main>
    )
}
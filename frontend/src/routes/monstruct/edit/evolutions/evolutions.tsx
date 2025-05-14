import "./evolutions.scss";

export default function Evolution_Editor(){

    return(
        <div class="evolution-editor">
        {/* Column */}
            <h1>Evolutions</h1>

            <div>
                <AddEvolutionButton />
            </div>

        </div>
    )
}

function AddEvolutionButton(){
    return(
        <button>
            +
        </button>
    )
}

function EvolutionPopup(){
    // Evolution Requirement Type

    // Evolution Requirement Value


    return(
        <div class="evolution-popup-container">
            <div>
                <h2>Header</h2>

                <div>
                    {/* Level, Friendship, Item */}
                    <img class="evolution-method-icon" alt="level"/>
                    <img class="evolution-method-icon" alt="level"/>
                    <img class="evolution-method-icon" alt="level"/>
                </div>
            </div>
        </div>
    )


}
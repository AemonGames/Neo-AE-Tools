import { For, createResource } from "solid-js"
import { useSearchParams } from "@solidjs/router";
import './learnset.scss';
import { GetMonsterData } from "../../../../serverFunctions";
import { LearnableMove, Move } from "../../../../../../lib/types";




export default function Learnset_Editor(){

    const [searchParams] = useSearchParams();
    const [monsterRecord, { mutate, refetch }] = createResource(searchParams["name"], GetMonsterData);

    var move : Move = {
        Name: "Blazing Fist",
        Type: "Fire",
        Category: "Physical",
        Power: 60,
        Accuracy: 95,
        PP: 25
    }

    var learnableMoves : LearnableMove[] = [
        {Level : 1, Move : move},
        {Level : 1, Move : move},
        {Level : 1, Move : move},
        {Level : 1, Move : move},
        {Level : 1, Move : move},
        {Level : 1, Move : move},
    ]

    var teachableMoves : Move[] = [
        
    ]

    return(
        <>
            <div class="learnset-editor-container">
                <table>
                    <thead>
                        <tr>
                            <th>Level</th>
                            <th>Move</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Power</th>
                            <th>Accuracy</th>
                            <th>PP</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Add For loop here */}
                        <For each={learnableMoves}>
                            {(move, index) => (
                                <tr>
                                    <td>{move.Level}</td>
                                    <td>{move.Move.Name}</td>
                                    <td>{move.Move.Type}</td>
                                    <td>{move.Move.Category}</td>
                                    <td>{move.Move.Power}</td>
                                    <td>{move.Move.Accuracy}</td>
                                    <td>{move.Move.PP}</td>
                                </tr>
                            )}
                        </For>
                    </tbody>
                </table>

                <button>
                    Add
                </button>
                
            </div>
        </>
    )
}
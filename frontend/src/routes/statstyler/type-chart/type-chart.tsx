import { createResource } from "solid-js"
import { serverURL } from "../../../common";

export default function TypeChart(){

    async function fetchTypeData(){
        const data = await fetch(`${serverURL}/`);
        console.log(data);
    }

    const [typeData] = createResource(fetchTypeData);
    

    return(
        <main>

            <h1>Type Chart</h1>

            

        </main>
    )

}
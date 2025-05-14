import { createStore } from "solid-js/store";
import { Monster } from "../../../../../../lib/types";
import { GetMonsterData } from "../../../../serverFunctions";
import { createResource } from "solid-js";
import { useSearchParams } from "@solidjs/router";

export default function Info_Editor(){

    const [params] = useSearchParams();
    
    const [sourceData] = createResource(params['name'], GetMonsterData);
    const [formData, SetFormData] = createStore<Monster>(sourceData);

    return(
        <div>
            Info Editor
        </div>
    )
}
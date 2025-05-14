import { Accessor, For, Setter, Signal, Suspense, VoidProps, createResource, createSignal } from "solid-js";
import { Monster } from "../../../../common";
import { GenerateImageLink, GetMonsterData } from "../../../../serverFunctions";
import { useSearchParams } from "@solidjs/router";

import "./compare.scss";
import { createStore, reconcile, unwrap } from "solid-js/store";


export default function Compare_Editor(){

    const [searchParams] = useSearchParams();
    console.log(searchParams["name"]);

    function AddToCompareList<T>(value: T): Signal<T> {
        const [store, setStore] = createStore({

            value
        
          });
        
          return [
        
            () => store.value,
        
            (v: T) => {
        
              const unwrapped = unwrap(store.value);
        
              typeof v === "function" && (v = v(unwrapped));
        
              setStore("value", reconcile(v));
        
              return store.value;
        
            }
        
          ] as Signal<T>;
        
    }
    


    const [monsterRecord, { mutate, refetch }] = createResource(searchParams["name"], GetMonsterData, {
        storage : AddToCompareList
    });

    const [ComparingRecords, SetComparingRecords] = createSignal<Monster[]>([]);

    return(
        <div class="viewport">
            <h1>Compare Editor</h1>

            <div class="comparison-pane-container">


                <Suspense fallback={<>HI</>}>
                    {
                        monsterRecord() && (
                            <ComparePane monsterRecord={monsterRecord()!} /> 
                        )
                        
                    }
                </Suspense>

                <Suspense fallback={<>HI</>}>
                    <For each={ComparingRecords()}>{(record, index) =>(
                        record && (
                            <ComparePane monsterRecord={monsterRecord()!} /> 
                        )

                    )}

                    </For>
                    {
                        
                    }
                </Suspense>

            </div>


        </div>
    )



    function ComparePane(props : VoidProps<{monsterRecord : Monster, isRoot? : boolean}>){

        return(
            <div class="comparison-pane">

                <img src={GenerateImageLink(props.monsterRecord.id, props.monsterRecord.image)} />

            </div>
        )
    }
}


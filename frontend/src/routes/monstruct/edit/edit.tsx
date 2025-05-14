import { Suspense, createResource } from "solid-js";
import MonsterTicket from "../../../components/monstruct/MonsterTicket/MonsterTicket";
import { serverURL } from "../../../common";
import "./edit.scss";
import { useParams, useSearchParams } from "@solidjs/router";
import axios from "axios";
import { PresentationButton, PresentationLink } from "../../../components/PresentationSchemes/PresentationSchemes";
import { GetMonsterData } from "../../../serverFunctions";






export default function Edit(){

    const [searchParams] = useSearchParams();
    console.log(searchParams["name"]);

    const [monsterRecord, { mutate, refetch }] = createResource(searchParams["name"], GetMonsterData);

    return(
        <div class="monstruct-editor">
            <div class="monster-ticket-preview">
                <Suspense fallback={<>HI</>}>
                    <div>
                        {
                            monsterRecord() && (
                                <MonsterTicket monsterRecord={monsterRecord()!} />
                            )
                        }
                    </div>
                </Suspense>
            </div>
            
            <div class="edit-options">
                <PresentationLink label="Edit Learnset"         href={"learnset?name="+searchParams["name"]} img_src={undefined!}/>
                <PresentationLink label="Add Evolutions/Formes"        href="evolutions" img_src={undefined!}/>
                <PresentationLink label="Edit Info"             href="info" img_src={undefined!}/>
                <PresentationLink label="Compare"               href="compare" img_src={undefined!}/>

                <PresentationButton click_func={() => alert("Lmao")} label="Delete" img_src={undefined!} hintText="Delete data"/>
            </div>

        </div>
    )
}
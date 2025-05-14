import axios, { AxiosResponse } from "axios";
import { serverURL } from "./common";
import { CreateMonsterRequest, Monster, MonsterCard } from "../../lib/types";

// All of these functions require error code handling


// Mostly used for debug
function ParseResult(response : AxiosResponse){
    console.log("Printing Response");
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.data);
    console.log(response.config);
    console.log("End Response");
}


// Monster Functions

export async function GetRecentMonsterTickets() : Promise<MonsterCard[]>{
    const result = await axios.get(`${serverURL}/api/db/monster/recent`);
    console.log(result);
    return result.data;
}

export async function GetMonsterData(name : string) : Promise<Monster>{
    const result = await axios.get(`${serverURL}/api/db/monster?name=${name}`);
    console.log(result.data);
    return result.data;
}
export async function GetMonsterCard(name : string) : Promise<MonsterCard>{
    const result = await GetMonsterData(name);
    const casted_result = result as Monster;

    let monsterCard : MonsterCard = {
        name : casted_result.name,
        id : "",
        image : casted_result.image,
        type : casted_result.primary_type,
        type_2 : casted_result.secondary_type
    }

    return monsterCard;
}

export async function SubmitCreature(formData : CreateMonsterRequest){

    console.log(JSON.stringify(formData));
    console.log(formData);
    console.log(formData.image);

    const response = await axios.post(`${serverURL}/api/db/monster`, formData, {headers : {'Content-Type': 'multipart/form-data'}});
    
    console.log(response);
    
    //return response.status == HttpStatusCode.Ok;
}


// Ability Functions

export async function GetAbilityByID(recordID : string) : Promise<Monster>{
    const result = await axios.get(`${serverURL}/api/db/ability?id=${recordID}`)
    console.log(result.data);
    return result.data;
}

export async function GetAbilityList(){
    const result = await axios.get(`${serverURL}/api/db/ability/list`);
    console.log(result.data);
    return result.data;
}


// Move Functions

export async function GetMoveByID(recordID : string) : Promise<Monster>{
    const result = await axios.get(`${serverURL}/api/db/ability?id=${recordID}`)
    console.log(result.data);
    return result.data;
}

export async function GetMoveList(){
    const result = await axios.get(`${serverURL}/api/db/ability/list`);
    console.log(result.data);
    return result.data;
}

export async function GetMonsterLearnset(){
    const result = await axios.get(`${serverURL}/api/db/ability/list`);
    console.log(result.data);
    return result.data;
}



// Other / Misc Functions

export async function GetMonsterTypes() : Promise<string[]>{
    const result = await axios.get(`${serverURL}/api/db/type/list`)
    console.log(result.data);
    return result.data;
}

// Static Resource Functions (Needs Database access)

export function GenerateImageLink(recordID : string, imageName : string){
    //return `${databaseURL}/api/files/monsters/${recordID}/${imageName}`;
    return `${serverURL}/api/files/monsters/${recordID}/${imageName}`;
}
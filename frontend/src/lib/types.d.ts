export type DYNA_CMD = {
    Commands: string[],
    Events : {
        TimeOptions : string[],
        TargetOptions : string[],
        ConditionReference: string[][],
        ConditionValue : string[][]
    },
    Functions: string[][],
    Variable : string[][],
    Toggles : string[]
}

export type EstimateMonStats = {
    hp : string
    atk : string
    sp_atk: string
    def : string
    sp_def : string
    spd : string
}

export type Monster = {
    name : string
    image : File
    rarity : string
    primary_type: string
    secondary_type: string
    abilities : string[]  // fix later

    description : string
    
    weight_class : string
    weight_value : number
    height_class : string
    height_value : number
    
    // Page 2
    base_stats : EstimateMonStats
    
    // Page 3
    egg_groups : string[]
    hatch_time : string
    
    // Page 4
    catch_rate : string
    base_friendship : string
    
    // Page 5
    exp_yield : string
    leveling_rate : string
    
    ev_yield : EstimateMonStats
    features : string[]
    
    
}

export interface CreateMonsterRequest extends Monster{
    notes : string
    lore : string
}

export interface MonsterCard{
    id : string,
    name : string,
    image : any,
    type : string
    type_2?: string | undefined
}

export type LearnableMove = {
    Level : number,
    Move : Move
}

export type Move = {
    Name: string,
    Type: string,
    Category: string,
    Power: number,
    Accuracy: number,
    PP: number
}

export interface MonsterMoveRecord{
    id : string,
    name : string,
    learnset : LearnableMove[] // To be parsed from json
}
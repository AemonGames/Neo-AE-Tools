import { Select } from "@thisbeyond/solid-select";
import { Monster, EstimateMonStats, CreateMonsterRequest } from '../../../../../lib/types';
import { SetStoreFunction } from "solid-js/store";
import { createResource } from "solid-js";
import { GetMonsterTypes } from "../../../serverFunctions";
import "./pageStyles.scss";

const rarityLevels = ["Common", "Less Common","Uncommon", "Somewhat Rare", "Rare"];
const statLevels = ["Very Low", "Low", "Average", "High", "Very High"];
const weightOptions = ["Weightless", "Ultra Light", "Light", "Heavy Light", "Average", "Light Heavy", "Heavy", "Super Heavy", "Ultra Heavy"]
const heightOptions = ["Smol", "Very Short", "Short", "Average", "Tall", "Very Tall"];
const hatchSpeedOptions = ["Insanely Fast", "Very Fast", "Fast","Average", "Long", "Very Long"];

const catchRateOptions = ["Guaranteed", "very easy", "easy", "moderately easy", "moderately difficult", "difficult", "very difficult", "near impossible"]

const MonsterFeatureOptions = ["Claws", "Talons", "Fist", "Tentacles", "Beak", "Fangs", "Horns"]

const [MonTypeActions] = createResource(GetMonsterTypes);

export function PageOne(set : SetStoreFunction<CreateMonsterRequest>, formData : Monster){
    return(
        <div class="page" id="biography">
            <h2>Biography</h2>
            
            <label for="name">Name</label>
            <input id="name"
                required
                onChange={ele => set('name', ele.target.value)}
            />

            <div>
                <h4>Image</h4>
                <input type='file' accept=".png,.jpg,.jpeg"
                    //onChange={ele => console.log(ele.target.)}
                    onChange={ele => {
                        const files : FileList = ele.target.files as FileList;

                        if(files.length <= 0){
                            console.log("Invalid number of files");
                        }
                        else{
                            console.log(files[0]);
                        }

                        set('image', ele.target.files!['0']);
                
                }}
                />
            </div>
            
            <label for="rarity">Rarity</label>
            <Select options={rarityLevels} id="rarity"
                onChange={val => set('rarity', val)}
            />
        
            <div>
                <h4>Types</h4>
                <div style={{display:'flex', 'flex-direction' : 'row'}}>
                
                    <div style={{display:'flex', 'flex-direction' : 'column'}}>
                        
                        <label for="primary-type">Primary</label>
                        {
                            MonTypeActions() && (
                                <Select options={MonTypeActions()!} 
                                id='primary-type'
                                onChange={value => {
                                    set('primary_type', value);
                                }}
                                isOptionDisabled={(option) => option === formData.secondary_type}
                                />
                                )
                        }
                        
                    </div>

                    <div style={{display:'flex', 'flex-direction' : 'column'}}>
                        <label for="secondary-type">Secondary</label>
                        {
                            MonTypeActions() && (
                                <Select options={MonTypeActions()!} 
                                id='secondary-type'
                                onChange={value => {
                                    set('secondary_type', value);
                                }}
                                isOptionDisabled={(option) => option === formData.primary_type}
                                />
                            )
                        }
                        
                    </div>
                </div>
            </div>
            
            <div>
                <h4>Abilities</h4>
                <Select multiple options={["PLACEHOLDER, PLEASE FIX ME"]} />
            </div>

            <div>
                <h4>Description</h4>
                <textarea id="description" name="description" 
                    
                    style={{width : "90%", height: "40%"}}
                    onChange={ele => set('description', ele.target.value)}
                ></textarea>
                
            </div>
            
            
            
            <div>
                <h4>Lore</h4>
                <input id="lore" style={{width : "90%", height: "40%"}}
                    onChange={ele => set('lore', ele.target.value)}
                />
                
            </div>
        
            

            <div style={{display: 'flex', "justify-content":"space-evenly"}}>
                <div>

                    <label for="weight">Weight</label>
                    <Select options={weightOptions} id="weight" 
                        onChange={val => set('weight_class', val)}
                        
                        />
                    
                    <label for="weight-specific">Specific</label>
                    <input type="range" min="1" max="100" value="50" id="weight-specific"
                        onchange={val => set('weight_value', val.target.valueAsNumber)}
                    ></input>
                </div>

                <div>

                    <label for="height">Height</label>
                    <Select options={heightOptions} id="height"
                        onChange={val => set('height_class', val)}
                        />
                    <label for="height-specific">Specific</label>
                    <input type="range" min="1" max="100" value="50" id="height-specific"
                        onchange={val => set('height_value', val.target.valueAsNumber)}
                    ></input>
                </div>
            </div>

        </div>
    )
}


export function PageTwo(set : SetStoreFunction<CreateMonsterRequest>){
    return(
        <div class="page" id="stats">
            <div class="base-stat-container">
                <h3>Base Stat Approximation</h3>
                
                <div style={{display:"flex", "flex-direction":"column"}}>
                    <label for="hp">HP:</label>
                    <Select options={statLevels} id='hp' 
                        onChange={val => set('base_stats','hp', val)}
                    />
                    
                    <label for="atk">ATK:</label>
                    <Select options={statLevels} id='atk' 
                        onChange={val => set('base_stats','atk', val)}
                    />
                    
                    <label for="sp_atk">SP.ATK:</label>
                    <Select options={statLevels} id='sp_atk' 
                        onChange={val => set('base_stats','sp_atk', val)}
                    />
                    
                    <label for="def">DEF:</label>
                    <Select options={statLevels} id='def' 
                        onChange={val => set('base_stats','def', val)}
                    />
                    
                    <label for="sp_def">SP.DEF:</label>
                    <Select options={statLevels} id='sp_def' 
                        onChange={val => set('base_stats','sp_def', val)}
                    />
                    
                    <label for="spd">SPD:</label>
                    <Select options={statLevels} id='spd' 
                        onChange={val => set('base_stats','spd', val)}
                    />
                </div>

            </div>

        </div>
    )
}

export function PageThree(set : SetStoreFunction<CreateMonsterRequest>){
    return(
        <div id="breeding">
            <div>
                <h3>Breeding Info</h3>

                <label for="egg_group">Egg Groups</label>
                <Select options={[]} id="egg_group" 
                    onChange={val => set('egg_groups', val)}
                    multiple
                    //LIMIT_TO_TWO

                />
                
                <label for="hatch_time">Hatch Time</label>
                <Select options={hatchSpeedOptions} id='hatch_time'
                    onChange={val => set('hatch_time', val)}
                />

            </div>
        </div>
    )
}

export function PageFour(set : SetStoreFunction<CreateMonsterRequest>){
    return(
        <div id="companion">
            <h2>Companionship</h2>
            <div>
                <label for="catch_rate">Catch Rate</label>
                <Select options={catchRateOptions} id="catch_rate" 
                    onChange={val => set('catch_rate', val)}
                />

            <label for="base_friendship">Base Friendship</label>
                <Select options={statLevels} id="base_friendship" 
                    onChange={val => set('base_friendship', val)}
                    />

            </div>
        </div>
    )
}

export function PageFive(set : SetStoreFunction<CreateMonsterRequest>){
    return(
        <div id="growth">
            <div>
                <h3>Leveling</h3>
                {/**
                 * 
                <label for="exp_yield">Base Exp Yield</label>
                <Select options={["Low", "Medium", "High"]} id="exp_yield" 
                    onChange={val => set('exp_yield', val)}
                />
                 */}
                
                <label for="leveling_rate">Leveling_Rate</label>
                <Select options={["Low", "Medium", "High"]} id="leveling_rate" 
                    onChange={val => set('leveling_rate', val)}
                />
                
                    {/**
                <div class="base-stat-container">
                     * 
                <h3>EV (Potential) Yield</h3>
                
                <div style={{display:"flex", "flex-direction":"column"}}>
                    <label for="hp">HP:</label>
                    <Select options={statLevels} id='hp' 
                        onChange={val => set('ev_yield','hp', val)}
                        />
                    
                    <label for="atk">ATK:</label>
                    <Select options={statLevels} id='atk' 
                        onChange={val => set('ev_yield','atk', val)}
                        
                        />
                    
                    <label for="sp_atk">SP.ATK:</label>
                    <Select options={statLevels} id='sp_atk' 
                        onChange={val => set('ev_yield','sp_atk', val)}
                        />
                    
                    <label for="def">DEF:</label>
                    <Select options={statLevels} id='def' 
                        onChange={val => set('ev_yield','def', val)}
                        />
                    
                    <label for="sp_def">SP.DEF:</label>
                    <Select options={statLevels} id='sp_def' 
                        onChange={val => set('ev_yield','sp_def', val)}
                        />
                    
                    <label for="spd">SPD:</label>
                    <Select options={statLevels} id='spd' 
                        onChange={val => set('ev_yield','spd', val)}
                    />
                </div>

                </div>
                */}

            </div>

        </div>
    )
}


export function PageSix(set : SetStoreFunction<CreateMonsterRequest>){


    return(
        <div id="characteristics">

            <div class="base-stat-container">
            
                <h3>Characteristics</h3>

                <label for="features">Features:</label>
                <Select options={MonsterFeatureOptions} id='features' 
                    multiple
                    onChange={val => set('features', val)}
                />

                <div>
                    <h4>Notes</h4>
                        <input id="notes" style={{width : "90%", height: "40%"}}
                    onChange={ele => set('notes', ele.target.value)}
                    />
                
                </div>
            </div>
        </div>
    )
}

export interface Position{x : number, y : number}

export class MapLayer{
    public name : string;
    public isVisible : boolean;
    public tiles : Map<Position, number>

    constructor(_name : string){
        this.name = _name;
        this.isVisible = true;
        this.tiles = new Map([])
    }
}

export class MultiLayer{

}
export class ProjectionLayer{
    // Might change from interface, but projection layers can only
    // are constrained to points as combined tile layers
    // Mainly used for drawing objects, paths and decorations
} 

export class TileLayer extends MapLayer{
    // Should encompass both ground and water

    constructor(){
        super("");
        this.tiles = new Map([])
    }
}

export class ObjectLayer extends ProjectionLayer{
    objects : Map<Position, {objectID : number, objectProperties : number}>

    constructor(){
        super();
        this.objects = new Map([]);
        
    }

}

export class DecorationLayer extends ProjectionLayer{

}


export enum BrushType {
    Block, Radial
}

export interface BrushPreset{
    pattern : number[][]
}
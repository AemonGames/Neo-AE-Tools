export class Tile{
    x : number
    y : number
    tileset : string
    tileID : number

    constructor(x : number, y : number, tileset : string, tileID : number){
        this.x = x;
        this.y = y;
        this.tileset = tileset;
        this.tileID = tileID;
    }
}

export interface Tilev2{
    pos : {string:string, tileID : number} // x-y

}
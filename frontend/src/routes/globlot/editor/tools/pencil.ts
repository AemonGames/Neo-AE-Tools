import { mapLayers, UserSettings } from "../data/stores";
import { MapLayer, Position } from "../data/types";
import { Vector2, Vector3 } from "../structs/math";

let isMouseDown = false;
const cellSize = 16;
let eraseMode = false;

export function PencilClick(e : PointerEvent, mapCanvas? : HTMLCanvasElement){
    console.log("Pencil was clicked");
    if(mapCanvas == undefined) return;
    let brushPosition : Vector2 = new Vector2();

    
    if(e instanceof MouseEvent){
        isMouseDown = true;
        console.log("Clicked with mouse");
    }

    // if(e instanceof TouchEvent){
    //     console.log("Touched");
    // }
    
    if(e.altKey){
        console.log("Alt also pressed");
        // Fill area?


        isMouseDown = false;

    }

    if(e.ctrlKey){
        console.log("Ctrl also pressed");
        eraseMode = true;        
    }
}

function GetCellPosition(mapCanvas: HTMLCanvasElement, e: PointerEvent) : Vector2{

    // Todo: Isolate rect parts of formula and use as constant values to be recalculated on resize

    var rect = mapCanvas.getBoundingClientRect();


    let x = (e.clientX - rect.left) / (rect.right - rect.left) * mapCanvas.width;
    let y = (e.clientY - rect.top) / (rect.bottom - rect.top) * mapCanvas.height;

    // Because of the newer system, tiles painted can only be 16x16, different sizes simply mean multiple tiles are present
    // Tl;dr: brush size defines an array of tiles
    let conv_x = Math.trunc(x / (UserSettings.brush.size * cellSize)) * (UserSettings.brush.size * cellSize);
    let conv_y = Math.trunc(y / (UserSettings.brush.size * cellSize)) * (UserSettings.brush.size * cellSize);
    
    // Should actually take brush shape into account
    // for(let i = 0; i < UserSettings.brush.size; i++){
    //     let better_conv_x = Math.trunc(x + i / cellSize) * cellSize;
    //     let better_conv_y = Math.trunc(y / cellSize) * cellSize;

    // }
    
    
    // Translate to unit positions
    let position: Position = {
        x: conv_x == 0 ? conv_x : conv_x / cellSize,
        y: conv_y == 0 ? conv_y : conv_y / cellSize
    };

    return position;
}


function PaintTile(mapCanvas: HTMLCanvasElement, e: PointerEvent) {
    
    const position = GetCellPosition(mapCanvas, e);
    
    // Might change paintIndex to a dynamic enum (values saved in level settings)
    mapLayers[UserSettings.currentLayer].tiles.set(position, UserSettings.currentPaintIndex);
}

function EraseTile(mapCanvas: HTMLCanvasElement, e: PointerEvent) {
    const position = GetCellPosition(mapCanvas, e);
    
    mapLayers[UserSettings.currentLayer].tiles.delete(position);

}

let lastPosition : Vector2 = new Vector2();

export function PencilDrag(e : PointerEvent, mapCanvas : HTMLCanvasElement){

    if(!isMouseDown) return;
    // console.log("Pencil was dragged");

    
    // Todo: Make version to implement in position function
    // Prevents drawing on the same position
    if(lastPosition.x == e.clientX && lastPosition.y == e.clientY) return;
    lastPosition.x = e.clientX;
    lastPosition.y = e.clientY;
    
    if(eraseMode){
        // Erase tile from map
        EraseTile(mapCanvas, e);
    }
    else{

        // Adds tile to the map
        PaintTile(mapCanvas, e);
    }
}

export function PencilRelease(e : PointerEvent, mapCanvas? : HTMLCanvasElement){
    console.log("Pencil was released");
    lastPosition = new Vector2(-1,-1);
    isMouseDown = false;
    eraseMode = false;
}
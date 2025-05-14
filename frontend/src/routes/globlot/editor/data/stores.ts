import { createStore } from "solid-js/store";
import { BrushType as BrushShape, MapLayer } from "./types";


export type UserData = {
    currentLayer : number // Active layer is an index of mapLayers
    currentPaintIndex : number
    brush : {
        size : number,
        shape : BrushShape
        hardness: number
    }
    zoomLevel : number
    zoomInc : number
    
}


export const [UserSettings, AdjustUserSettings] = createStore<UserData>(
    {
        currentLayer : 0,
        currentPaintIndex : 0,
        brush: {
            size : 1,
            shape : BrushShape.Block,
            hardness : 1
        },
        zoomLevel : 1.0,
        zoomInc : 0.25
    }
);


// Should be under Map Class (temporary/maybe)
export const [mapLayers, SetMapLayers] = createStore<MapLayer[]>([]);

export const [colorMap, SetColorMap] = createStore([
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#FF00FF"
]);
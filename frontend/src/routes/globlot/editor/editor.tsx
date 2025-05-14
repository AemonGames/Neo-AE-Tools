import { For, Show, createSignal, onMount } from "solid-js";
import Dismiss from "solid-dismiss";
import { Signal } from "solid-js";
import { Socket, io } from "socket.io-client";
import { ReactiveMap } from "@solid-primitives/map";
import { createStore, produce, SetStoreFunction } from "solid-js/store";
import { settings } from "../../../common";


import { Tool, tools } from "./tools/tool";
import LevelSettingsPopup, { ShowLevelPopupMenu } from "./components/levelSettingsPopup";
import { DisplayTools } from "./components/DisplayTools";
import { LayerList } from "./components/LayerList";
import { ClearCanvas, PaintTile, onresize } from "./structs/shortcuts";
import { MapSettings } from "./structs/mapsettings";

import {TilePicker} from "./windows/tilepicker";
import { LevelMap } from "./windows/levelmap";
import { mapLayers, SetMapLayers, AdjustUserSettings } from "./data/stores";
import { TileLayer } from "./data/types";

import { UserSettings, UserData, colorMap, SetColorMap } from "./data/stores";



import spritesheet from "../../../resources/temp/spritesheet.png";

// Editor Styles
import "./editor.scss";


class LevelViewport{
    _map_settings : MapSettings
    zoomLevel : number
    
    constructor(){
        this._map_settings = {
            "description" : "",
            mapName : "",
            tileSize : 32
        };

        this.zoomLevel = 1;
    }
}




export default function Map_Editor(){

    var mapCanvas : HTMLCanvasElement
    var tilesetCanvas : HTMLCanvasElement
    
    var levelPopupMenu : HTMLDivElement
    var lvlMenuBtn : HTMLButtonElement


    const [GetActiveTool, SetActiveTool] : Signal<Tool> = createSignal(tools[0]);

    const [MapViewportSize, SetMapViewportSize] = createStore({width : 200, height : 200})
    
    const [GetZoomLevel, SetZoomLevel] = createSignal();
    
    const [mapSettings, SetMapSettings] = createStore<MapSettings>({
        mapName : "",
        description : "",
        tileSize : 1
    })

    

    // Mouse Controls

    function DragHandler(e : MouseEvent){
        
    }

    
    console.log(import.meta.env.VITE_GLOBLOT_URL);
    const socket = io(import.meta.env.VITE_GLOBLOT_URL as string);

    socket.on("connect", () => {
        console.log(`You connected with id: ${socket.id}`);
        socket.emit("custom-event", 10, "Hi", {roar : "meow"});
    })


    const [GetLevelMenuPopup, SetLevelMenuPopup] = createSignal(false);

    let mapViewport : LevelMap
    
    function Draw(){
        window.requestAnimationFrame(Draw);
    }

    let isMouseDown = false;
    
    onMount(()=>{
        console.log("Setting up map context");

        // Separate into 2 different concepts
        mapViewport = new LevelMap(mapCanvas, socket, MapViewportSize, SetMapViewportSize);
        
        let tilePickerViewport = new TilePicker(tilesetCanvas);
        tilePickerViewport.AddSpritesheet(spritesheet);
        tilePickerViewport.DrawTileset(0);

        //window.requestAnimationFrame(mapViewport.DrawMap);
        //console.log("Mount called");
        //mapCanvas.addEventListener("touchstart", UseActiveTool);
        //mapCanvas.addEventListener("click", (e) => UseActiveTool);
        
        
        // mapCanvas.addEventListener("mousedown", (e : MouseEvent) => {
        mapCanvas.addEventListener("pointerdown", (e : PointerEvent) => {
            
            if(mapLayers.length == 0){
                alert("No layers found, Please add a layer first");
                return;
            }

                
            isMouseDown = true;
            
            switch(e.button){

                case 0: // Left Mouse Button
                    GetActiveTool().click_callback(e, mapCanvas);
                    break;

                case 1: // Middle Mouse Button
                    console.log("");
                    break;

                case 2: // Right Mouse Button

                    break;
                
                default:
                    isMouseDown = false;
            }

            
        });

        // mapCanvas.addEventListener("mousemove", (e : MouseEvent) => {
        mapCanvas.addEventListener("pointermove", (e : PointerEvent) => {

            if(mapLayers.length == 0) return;
            
            GetMousePos(e);
            
            if (isMouseDown) {
                const activeTool = GetActiveTool();
                if (activeTool && activeTool.drag_callback) {
                    activeTool.drag_callback(e, mapCanvas);
                }
            }
            
        });
        
        
        
        // mapCanvas.addEventListener("mouseup", (e : MouseEvent) => {
        mapCanvas.addEventListener("pointerup", (e : PointerEvent) => {
            
            if(mapLayers.length == 0) return;
            
            switch(e.button){
                
                case 0: // Left Mouse Button
                    const activeTool = GetActiveTool();
                    if (activeTool && activeTool.drag_callback) {
                        activeTool.drag_callback(e, mapCanvas);
                    }

                
                break;
                
                case 1: // Middle Mouse Button
                    console.log("");
                    break;

                case 2: // Right Mouse Button

                    break;
                
            }
                
            isMouseDown = false;
            
        });

        mapCanvas.addEventListener("pointercancel", (e : PointerEvent) => {

        });

        onresize(mapCanvas, function(){
            SetMapViewportSize({
                width : mapViewport.mapContext.canvas.offsetWidth,
                height : mapViewport.mapContext.canvas.offsetHeight
            });

            mapViewport.size = MapViewportSize;
        });

        // mapCanvas.addEventListener("touchstart", (e : TouchEvent) => {
        //     console.log("This works?"); 
        //     UseActiveTool(e);
        //})


    })

    

    function GetMousePos(evt : MouseEvent) {
        //console.log("This works");
        var rect = mapCanvas.getBoundingClientRect();

        let x = (evt.clientX - rect.left) / (rect.right - rect.left) * mapCanvas.width;
        let y = (evt.clientY - rect.top) / (rect.bottom - rect.top) * mapCanvas.height;

        mapViewport.MouseMoveHandler(x,y);
        
    }

    

    function AddNewLayer(){
        let newLayer : TileLayer = {name: "New Layer", isVisible : true, tiles : new Map([])};

        SetMapLayers(produce(layers=>
            layers.push(newLayer)
        ));
    }


    let lastSelectedLayerDiv : HTMLDivElement

    return(
        <main class="map-editor-container">
            <div class="map-editor-sidebar">
                <h2>Title of Something</h2>
                <div class="tile-picker-container">
                    <canvas class="tile-picker-viewport" oncontextmenu={(e)=>{e.preventDefault(); }} ref={tilesetCanvas!} />
                </div>

                <div class="layer-list-container">
                    <LayerList
                        // SetActiveLayer={SetActiveLayer}
                        lastSelectedLayerDiv={lastSelectedLayerDiv!}
                    ></LayerList>
                </div>

                <div class="layer-controls">
                    <button onclick={AddNewLayer}>New Layer</button>
                    <button>New Autotile Layer</button>
                </div>
            </div>

            <div class="map-editor-window">
                
                <div class="map-editor-menubar">
                    <button onclick={ShowLevelPopupMenu} ref={lvlMenuBtn!}>
                        Level Name Options
                    </button>
                    
                    <LevelSettingsPopup
                        LevelMenuButton={lvlMenuBtn!}
                        GetLevelMenuPopup={GetLevelMenuPopup}
                        SetLevelMenuPopup={SetLevelMenuPopup}
                    ></LevelSettingsPopup>

                    <div class="color-map">
                        {/* <div class="color-map-row"> */}
                        <For each={colorMap}>{(color, index) => (
                            <ColorChoice color={color} index={index()} setter={AdjustUserSettings} />
                        )}</For>
                        <ColorChoice color="#FF00FF">+</ColorChoice>
                    </div>
                </div>

                <div class="map-editor-screen">
                    <div class="map-editor-side-toolbar">

                    <DisplayTools setTool={SetActiveTool}></DisplayTools>
                        
                    </div>

                    <div class="map-editor-viewport-container">
                        <canvas class="map-editor-viewport" ref={mapCanvas!} 
                        width={MapViewportSize.width} height={MapViewportSize.height}/>
                    </div>

                </div>
            </div>
        </main>
    )
}

function ColorChoice(props : {color : string, children? : any, index : number, setter : SetStoreFunction<UserData>}){

    function SetColor(){
        props.setter("currentPaintIndex", props.index);
        
    }

    return(
        <div 
            class="color-map-cell" 
            style={`background-color: ${props.color}`}
            onclick={SetColor}
        
        >
            {props.children}
        </div>
    )
}
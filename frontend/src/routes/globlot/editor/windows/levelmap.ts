import { Socket, io } from "socket.io-client";
import { ClearCanvas, DrawGridLine, PaintTile, onresize } from "../structs/shortcuts";
import { SetStoreFunction } from "solid-js/store";
import { mapLayers, AdjustUserSettings, UserSettings } from "../data/stores";
import { TileLayer } from "../data/types";
import { colorMap } from "../data/stores";

// Maybe draw grid outside of map class
enum GridMode{ SubGrid, MainGrid }

const CellSize : number = 16;

export class LevelMap{
    // Just the raw data for the level
    gtidMode : GridMode = 0;
    gridEnabled : boolean = true

    mapContext : CanvasRenderingContext2D
    public mapElement : HTMLCanvasElement


    


    // Change to use dictionary/object based format
    

    activeLayer : number = 0
    mapLayers = []

    last_conv_x : number = -1
    last_conv_y : number = -1

    grad : CanvasGradient | undefined


    public size


    constructor(_mapElement : HTMLCanvasElement, _socket : Socket, getSize : {width : number, height :number}, setSize : SetStoreFunction<{}>){
        console.log("Constructing level map");
        this.mapElement = _mapElement;

        this.mapContext = this.mapElement.getContext("2d")!;

        this.size = getSize;


        let mapDiv = this.mapElement.parentElement;
        console.log(mapDiv?.getBoundingClientRect());

        this.Resize(setSize);

        

        this.mapElement.addEventListener("mouseup", () => {
            console.log("Tile has been placed");
            _socket.emit("tile-place-event");
        })

        // Draw map in end
        this.SetHoverGradient();
        this.RedrawMap();

    }

// Draw Functions
    
    gridOffset : {xOffset : number, yOffset : number} = {xOffset : 0, yOffset : 0}
    DrawGrid(){
        if(!this.gridEnabled) return;
        // If loops found on either x or y
        if(Math.abs(this.gridOffset.xOffset) > CellSize) this.gridOffset.xOffset = 0
        if(Math.abs(this.gridOffset.yOffset) > CellSize) this.gridOffset.yOffset = 0

        const xCells = this.size.width / CellSize
        const yCells =  this.size.height / CellSize

        console.log(`Grid Redraw: Drawing Scale [x:${xCells}, y:${yCells}]`);

        // Draw vertical lines
        for(let i = 0; i < xCells; i++){
            if(i == 0) DrawGridLine(this.mapContext, -1, 0);
            else DrawGridLine(this.mapContext, CellSize*i, 0);
        }
        
        // Draw horizontal lines
        for(let i = 0; i < yCells; i++){
            if(i == 0) DrawGridLine(this.mapContext, 0, -1);
            else DrawGridLine(this.mapContext, 0, CellSize*i);
        }
    }

    ToggleGrid(){
        this.gridEnabled = !this.gridEnabled;
        this.RedrawMap();
    }


    // Divide size relative to grid scaling
    DrawMap(){

        this.mapContext.clearRect(0,0,this.mapElement.width, this.mapElement.height);

        mapLayers.forEach((value, index) => {
            //if(value instanceof TileLayer){
                value.tiles.forEach((val, pos) => {

                    // console.log(`Tile to be painted at ${[pos.x]}, ${pos.y}`);

                    // alpha variable paint color

                    if(index > colorMap.length){
                        console.log(`Invalid tile color. Color index (${val}) does not exist in colorMap`);
                        return;
                    }



                    PaintTile(this.mapContext, colorMap[val], 
                        pos.x, pos.y, CellSize
                    )
                })
            //}
        })

        this.DrawGrid()
    }

    

    // public Resize(SetScale : SetStoreFunction<{width:number, height:number}>){

    //     SetScale({
    //         width : this.mapContext.canvas.offsetWidth,
    //         height: this.mapContext.canvas.offsetHeight
    //     })

    //     this.mapElement.width = this.mapContext.canvas.offsetWidth;
    //     this.mapElement.height = this.mapContext.canvas.offsetHeight;
    // }
    

    // Adjusts the size of the viewport
    public Resize(SetScale : SetStoreFunction<{width:number, height:number}>){

        SetScale({
            width : this.mapElement.width = this.mapContext.canvas.offsetWidth,
            height: this.mapElement.height = this.mapContext.canvas.offsetHeight
        })
    }

    


    public RedrawMap(){
        ClearCanvas(this.mapContext, this.mapElement, "black");
        this.DrawMap();
    }

    public ZoomHandler(scrollDirection : number){
        // UserStuff.zoomLevel += scrollDirection * UserStuff.zoomInc;
        AdjustUserSettings("zoomLevel", old => old + scrollDirection * UserSettings.zoomInc);
    }

    public ResetZoom(){
        AdjustUserSettings("zoomLevel", 1);
    }

    public MouseMoveHandler(x : number,y : number){
        
        
        this.mapContext.strokeStyle = "solid blue";
        
        let conv_x = Math.trunc(x / (UserSettings.brush.size * CellSize)) * (UserSettings.brush.size * CellSize);
        let conv_y = Math.trunc(y / (UserSettings.brush.size * CellSize)) * (UserSettings.brush.size * CellSize);
        
        
        //console.log(`conv_x: ${conv_x}, conv_y: ${conv_y}`)
        if(conv_x == this.last_conv_x && conv_y == this.last_conv_y){
            return; // Prevent redraw
        }

        this.RedrawMap();
        
        this.SetHoverGradient();

        this.mapContext.strokeRect(conv_x,conv_y, (UserSettings.brush.size * CellSize), (UserSettings.brush.size * CellSize));

        this.mapContext.fillStyle = "#00FF00";
        this.mapContext.fillRect(conv_x,conv_y, (UserSettings.brush.size * CellSize), (UserSettings.brush.size * CellSize))
        
        this.last_conv_x = conv_x
        this.last_conv_y = conv_y

    }

    public ExportImage(){
        return this.mapElement.toDataURL();
    }


    SetHoverGradient(){
        this.grad = this.mapContext.createRadialGradient(150,75,15,150,75,150);
        this.grad.addColorStop(0,"lightblue");
        this.grad.addColorStop(1,"darkblue"); 

    }

    // public SetActiveLayer(layerIndex : number){
    //     this.activeLayer = layerIndex;
    // }

    // public GetActiveLayer(){
    //     return this.mapLayers[this.activeLayer];
    // }
    // public GetActiveLayerIndex(){
    //     return this.activeLayer;
    // }
}
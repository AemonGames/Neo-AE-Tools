import { ClearCanvas } from "../structs/shortcuts"


export class TilePicker{

    tilePickerCanvas : HTMLCanvasElement
    tilePickerContext : CanvasRenderingContext2D
    tilemaps : HTMLImageElement[]
    activeTileset : number
    backgroundColor : string

    constructor(tilePickerCanvas : HTMLCanvasElement){
        this.tilePickerCanvas = tilePickerCanvas;
        this.tilePickerContext = tilePickerCanvas.getContext("2d")!;

        let mapDiv = tilePickerCanvas.parentElement;

        tilePickerCanvas.width = mapDiv?.offsetWidth!;
        tilePickerCanvas.height = mapDiv?.offsetHeight!;

        this.tilemaps = [];
        this.activeTileset = 0;
        this.backgroundColor = "gray";

        this.WipeCanvas();

        // Add event listeners for selecting and dragging
        tilePickerCanvas.addEventListener("mousedown", () => {});
        // Either use if statement to control when this happens or add event listener on mousedown
        //tilePickerCanvas.addEventListener("mousemove", (e) => {console.log(`${e.clientX} , ${e.clientY}`)});
        tilePickerCanvas.addEventListener("mouseup", () => {});
        tilePickerCanvas.addEventListener("mouseout", () => {});

        
        

        tilePickerCanvas.addEventListener("mousedown", e => this.HandleMouseDown(e, tilePickerCanvas));

        //this.AddSpritesheet(spritesheet);
        //this.DrawTileset(this.activeTileset);

    }

    AddSpritesheet(tilesetSource : string){
        const img = new Image();
        img.src = tilesetSource;
        this.tilemaps.push(img);
    }

    DrawHandler = (img : HTMLImageElement) => {
        this.tilePickerContext.drawImage(img, 0, 0);
        img.removeEventListener("load", () => this.DrawHandler(img));
    }

    DrawTileset(index : number){
        if(index >= this.tilemaps.length){
            console.error("Invalid index for tilemap");
            return;
        }

        let img = this.tilemaps[index];

        if(!img.complete){
            img.addEventListener("load", () => this.DrawHandler(img))
        }
        else{
            this.tilePickerContext.drawImage(img, 0, 0);
        }


    }

    /**
     * 
     * Feature to add, on mouse down store initial position,
     * then use delta to calculate drag and multiply boxes x and y
     * based on that value. Might not do, because of smart tiling
     * 
     */

    HandleMouseDown(e : MouseEvent, tilePickerCanvas : HTMLCanvasElement){
        // returns value of selected tile
        const pos = this.HandleMouseClick(e, tilePickerCanvas);

        if(!pos) return;
        
        // should redraw before painting
        this.WipeCanvas();
        this.DrawTileset(this.activeTileset);

        // Paint the stroke
        this.tilePickerContext.strokeStyle = "solid blue";
        this.tilePickerContext.strokeRect(pos._x, pos._y, 32, 32);

        //sock
    }

    WipeCanvas(){
        ClearCanvas(this.tilePickerContext, this.tilePickerCanvas, this.backgroundColor);
    }

    HandleMouseClick(e : MouseEvent, tilePickerCanvas : HTMLCanvasElement){

        const rect = tilePickerCanvas.getBoundingClientRect();
        e.preventDefault();

        switch(e.button){

            case 0: // Left Mouse Button
                const x = (e.clientX - rect.left) / (rect.right - rect.left) * tilePickerCanvas.width;
                const y = (e.clientY - rect.top) / (rect.bottom - rect.top) * tilePickerCanvas.height;
        
        
                let conv_x = Math.trunc(x / 32) * 32;
                let conv_y = Math.trunc(y / 32) * 32;
                
                return {_x : conv_x, _y : conv_y};
                //break;

            case 2: // Right Mouse Button

                break;
        }

        
        
        // //console.log(`conv_x: ${conv_x}, conv_y: ${conv_y}`)
        // if(conv_x == this.last_conv_x && conv_y == this.last_conv_y){
        //     return; // Prevent redraw
        // }
        
        // this.tilePickerContext.strokeRect(conv_x,conv_y, 32, 32);
        
        // this.last_conv_x = conv_x
        // this.last_conv_y = conv_y
    }



}
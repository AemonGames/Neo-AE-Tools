
export function PaintTile(
    mapContext : CanvasRenderingContext2D, 
    color : string,
    row : number, column : number,
    tileSize : number = 32
)
    {
    mapContext.fillStyle = color;
    mapContext.fillRect(row * tileSize,column * tileSize,tileSize,tileSize);
}

export const onresize = (dom_elem : HTMLElement, callback : ()=>void) => {
    const ro = new ResizeObserver(()=>callback());
    ro.observe(dom_elem);
};


export function DrawGridLine(
    ctx : CanvasRenderingContext2D, 
    x : number = 0, y: number = 0 
){
    ctx.beginPath();

        ctx.moveTo(x, y);
        ctx.lineTo(
            x= ((x!=0)? x : ((x.valueOf() != -1)? ctx.canvas.width : 0)),
            y= ((y!=0)? y : ((y.valueOf() != -1)? ctx.canvas.height : 0))
        );
        ctx.lineWidth = 2;
    
    ctx.strokeStyle = "red";
    ctx.stroke();
    
}

export function ClearCanvas(mapContext : CanvasRenderingContext2D, mapCanvas : HTMLCanvasElement,
    color : string){

        mapContext.fillStyle = color;
        mapContext.fillRect(0,0,mapCanvas.width, mapCanvas.height);

}


export function ClearCanvasAlt(mapContext : CanvasRenderingContext2D, mapCanvas : HTMLCanvasElement,
    color : string){

        mapContext.fillStyle = color;
        mapContext.fillRect(0,0,mapCanvas.width, mapCanvas.height);

}
import { EraserClick } from "./eraser"
import { FillClick } from "./fill"
import { PencilClick, PencilDrag, PencilRelease } from "./pencil"
import { SelectClick } from "./select"

export interface Tool{
    name : string
    click_callback : (e : PointerEvent, mapCanvas : HTMLCanvasElement) => void
    drag_callback? : (e : PointerEvent, mapCanvas : HTMLCanvasElement) => void
    release_callback? : (e : PointerEvent, mapCanvas : HTMLCanvasElement) => void
}

export const tools : Tool[] = [
    {name : "Pencil", click_callback : PencilClick, drag_callback : PencilDrag, release_callback : PencilRelease}, 
    {name : "Eraser", click_callback : EraserClick},
    {name : "Select", click_callback : SelectClick},
    {name : "Fill", click_callback : FillClick},
    {name : "Sprinkle", click_callback : FillClick},
    {name : "SprinkleFill", click_callback : FillClick},
]


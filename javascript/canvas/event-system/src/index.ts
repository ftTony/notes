// https://github.com/JS-Hao/canvas-event-system/blob/master/src/canvas-event-system/index.ts
// https://zhuanlan.zhihu.com/p/269437630

import { rgbaToId } from "./helpers";
import { Shape } from "./shapes/types";
import EventSimulator, { ActionType } from "./EventSimulator";
export * from './shapes';

export class Stage {
    private canvas: HTMLCanvasElement;
    private osCanvas: OffscreenCanvas;
    private ctx: CanvasRenderingContext2D;
    private osCtx: CanvasRenderingContext2D;
    private dpr: number;
    private shapes: Set<string>;
    private eventSimulator: EventSimulator;

    constructor(canvas: HTMLCanvasElement) {
        const dpr = window.devicePixelRatio;
        canvas.width = parseInt(canvas.style.width) * dpr;
        canvas.height = parseInt(canvas.style.height) * dpr;

        this.canvas = canvas;
        this.osCanvas = new OffscreenCanvas(canvas.width,canvas.height);

        this.ctx = this.canvas.getContext("2d");
        this.osCtx = this.canvas.getContext("2d");

        this.ctx.scale(dpr,dpr);
        this.osCtx.scale(dpr,dpr);
        this.dpr = dpr;

        this.canvas.addEventListener("mousedown",this.handleCreator(ActionType.Down));
        this.canvas.addEventListener("mouseup",this.handleCreator(ActionType.Up));
        this.canvas.addEventListener("mousemove",this.handleCreator(ActionType.Move));
        
        this.shapes = new Set();
        this.eventSimulator = new EventSimulator();
    }

    add(shape: Shape) {
        const id = shape.getId();
        this.eventSimulator.addListeners(id,shape.getListeners());
        this.shapes.add(id);

        shape.draw(this.ctx,this.osCtx);
    }

    private handleCreator = (type:ActionType) => (evt:MouseEvent)=>{
        const x = evt.offsetX;
        const y = evt.offsetY;
        const id = this.hitJude(x,y);
        this.eventSimulator.addAction({type,id},evt);
    }

    private hitJude(x: number, y: number): string {
        const rgba = Array.from(this.osCtx.getImageData(x * this.dpr, y * this.dpr, 1, 1).data);
        const id = rgbaToId(rgba as [number, number, number, number]);

        return this.shapes.has(id) ? id : undefined;
    }
}

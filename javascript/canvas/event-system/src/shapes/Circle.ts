import { idToRgba } from "src/helpers";
import Base from "./Base";

interface RectProps{
    x:number;
    y:number;
    radius:number;
    strokeWidth?:number;
    strokeColor?:string;
    fillColor?:string;
}

export default class Circle extends Base{
    constructor(private props:RectProps){
        super();
        this.props.fillColor = this.props.fillColor || "#fff";
        this.props.strokeColor = this.props.strokeColor || "#000";
        this.props.strokeWidth = this.props.strokeWidth || 1;
    }

    draw(ctx: CanvasRenderingContext2D, osCtx: CanvasRenderingContext2D): void {
        const {x,y,radius,strokeColor,strokeWidth,fillColor} = this.props;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.arc(x,y,radius,0,Math.PI*2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}
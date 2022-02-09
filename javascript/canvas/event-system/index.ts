import { Stage,Rect,Circle,EventNames } from "src";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const stage = new Stage(canvas);

const rect = new Rect({
    x:50,
    y:50,
    width:250,
    height:175,
    fillColor:'green'
});

const circle = new Circle({
    x:200,
    y:200,
    radius:100,
    fillColor:'green'
})
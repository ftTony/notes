import { EventNames, Listener, Shape } from "./types";
import { createId } from "src/helpers";

export default class Base implements Shape {
    private listeners: { [eventName: string]: Listener[] };
    public id: string;
    constructor() {
        this.id= createId();
        this.listeners = {};
    }
    draw(ctx: CanvasRenderingContext2D, osCtx: CanvasRenderingContext2D): void {
        throw new Error('Method not implemented.');
    }
    on(eventName: string, listener: Listener): void {
        if(this.listeners[eventName]){
            this.listeners[eventName].push(listener);
        }else{
            this.listeners[eventName] = [listener];
        }
    }
    getListeners(): { [name: string]: Listener[]; } {
        return this.listeners;
    }
    getId(): string {
        return this.id;
    }
}

import {Listener,EventNames} from "./shapes";

export interface Action{
    type:ActionType;
    id:string;
}

export enum ActionType{
    Down = "DOWN",
    Up = "Up",
    Move = "MOVE",
}

export default class EventSimulator{
    private listenersMap:{
        [id:string]:{
           [eventName:string]:Listener[];
        }
    } = {};

    private lastDownId:string;
    private lastMoveId:string;
    
}
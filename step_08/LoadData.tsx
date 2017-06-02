import * as React from 'react';
import { IData, IPoint } from "./DataModel";
import { observable } from "mobx";
import { App } from "./App";

export class Data{
    @observable data: IData;
    @observable loaded: boolean = false;
    constructor(url: string){
        fetch(url).then(response =>  response.json().then(data => {
            if(!this.data){
                this.data = data;
            console.log("Data loaded");
            this.loaded = true;
            }
        }));
    }

    static getPoint(point: string){
        
        const tempPoints = point.split(',');
        return {x: Number(tempPoints[0]) + App.offSet.x, y: Number(tempPoints[1]) + App.offSet.y}
    }
}

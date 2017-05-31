import * as React from 'react';
import { IData, IPoint } from "./DataModel";
import { observable } from "mobx/lib/mobx";

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
}

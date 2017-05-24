import * as React from 'react';
import { observable, action } from 'mobx';
import * as ReactDOM from "@types/react-dom";

// DATAMODEL
export interface Shot{
    from:Point;
    to:Point;
}
export interface Point{
    x:number;
    y:number;
}



export class ShotModel{
    shot: Shot;
    from: PointModel;
    to: PointModel;
    key: number;

    constructor(shot:Shot, key:number) {
        this.shot = shot;
        this.from = new PointModel(shot.from);
        this.to = new PointModel(shot.to);
        this.key = key;
    }
    @action.bound onClickOnDelete(e: React.MouseEvent<HTMLButtonElement>){
        console.log(e);
    }
}

export class PointModel{
    @observable point: Point;
    constructor(point: Point){
        this.point = point
    }
    @action.bound onChangeX(e: React.ChangeEvent<HTMLInputElement>){
        this.point.x = Number(e.target.value)? Number(e.target.value) : this.point.x;
    }
    @action.bound onChangeY(e: React.ChangeEvent<HTMLInputElement>){
        this.point.y = Number(e.target.value)? Number(e.target.value) : this.point.y;
    }
}

export class ShotListModel{
    @observable shots: ShotModel[] = [];
    private shotNumber: number = 0;
    
    @action onDelete(shotModel: ShotModel){
        console.log("do you really want to delete line: " + shotModel.key);
        //ReactDOM.unmountComponentAtNode(shotModel);
    }
    
    @action.bound onAddShot(){
        this.shotNumber++;
        const lastShot = this.shots[this.shots.length-1];
        const positionX: number = lastShot? lastShot.to.point.x : 0;
        const positionY: number = lastShot? lastShot.to.point.y : 0;
        const nextShot: Shot = {from:{x:positionX, y:positionY}, to:{x:0, y:0}};
        this.shots.push(new ShotModel(nextShot, this.shotNumber));
    }
}
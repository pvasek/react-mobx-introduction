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
}

export class PointModel{
    @observable point: Point;
    constructor(point: Point){
        this.point = point
    }

    isNumber(number: string, previousValue: number){
        if(number === "" || number === "0"){return 0; }
        else if(!Number(number)){ return previousValue; }
        return Number(number);
    }

    @action.bound onChangeX(e: React.ChangeEvent<HTMLInputElement>){
        this.point.x = this.isNumber(e.target.value, this.point.x);
        e.target.value = this.point.x.toString();
    }
    @action.bound onChangeY(e: React.ChangeEvent<HTMLInputElement>){
        this.point.y = this.isNumber(e.target.value, this.point.y);
        e.target.value = this.point.y.toString();
    }
}

export class ShotListModel{
    @observable shots: ShotModel[] = [];
    private shotNumber: number = 0;
    
    @action deleteShot(shotModel: ShotModel){
        //console.log(shotModel.key)
        this.shots.splice(this.shots.indexOf(shotModel), 1);
        this.shots.map(shot => shot.key = this.shots.indexOf(shot)+1);
    }
    
    @action.bound onAddShot(){
        this.shotNumber++;
        const lastShot = this.shots[this.shots.length-1];
        const positionX: number = lastShot? lastShot.to.point.x : 10;
        const positionY: number = lastShot? lastShot.to.point.y : 10;
        const nextShot: Shot = {from:{x:positionX, y:positionY}, to:{x:10, y:10}};
        this.shots.push(new ShotModel(nextShot, this.shotNumber));
    }

    elmntMove: PointModel;
    canMove: boolean = false;
    @action startMoving(pointModel: PointModel){
        this.elmntMove = pointModel;
        this.canMove = true;
    }
    @action stopMoving(){
        this.canMove = false;
    }

    @action move(mouseX: number, mouseY: number){
        //console.log(mouseX + " " + mouseY);
        if(this.canMove){
            this.elmntMove.point.x=mouseX;
            this.elmntMove.point.y=mouseY;
        }
    }
}
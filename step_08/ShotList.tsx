import * as React from 'react';
import { Component } from 'react';
import { observable, action, autorun } from 'mobx';
import { observer } from "mobx-react";
import { IShot, IPoint } from "./DataModel";

export interface ShotListProps{
    model: ShotListModel;
}

@observer
export class ShotList extends Component<ShotListProps,{}>{
    
    render(){
        return (
            <div id="shotList">
                <h2>Golf shots</h2>
                <hr />
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>From</th> 
                            <th colSpan={2}>To</th>  
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.model.shots.map
                            (shot => 
                                <tr key={shot.key}>
                                    <td><input onChange={shot.from.onChangeX}value={shot.from.point.x} /></td>
                                    <td><input onChange={shot.from.onChangeY}value={shot.from.point.y} /></td>
                                    <td><input onChange={shot.to.onChangeX}value={shot.to.point.x} /></td>
                                    <td><input onChange={shot.to.onChangeY}value={shot.to.point.y} /></td>
                                    <td><button onClick={e => this.props.model.deleteShot(shot)}>-</button></td>
                                </tr> 
                            )
                        }
                    </tbody>
                </table> 
                <button onClick={this.props.model.onAddShot}>Add shot</button><span>{"Shot count: " + this.props.model.shots.length}</span>
            </div>
        );
    }
}

export class ShotModel{
    shot: IShot;
    from: PointModel;
    to: PointModel;
    key: number;

    constructor(shot:IShot, key:number) {
        this.shot = shot;
        this.from = new PointModel(shot.from);
        this.to = new PointModel(shot.to);
        this.key = key;
    }
}

export class PointModel{
    @observable point: IPoint;
    constructor(point: IPoint){
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
    
    @action deleteShot(shotModel: ShotModel){
        //console.log(shotModel.key)
        this.shots.splice(this.shots.indexOf(shotModel), 1);
        this.shots.map(shot => shot.key = this.shots.indexOf(shot)+1);
    }
    
    @action.bound onAddShot(){
        const lastShot = this.shots[this.shots.length-1];
        if(!lastShot || lastShot.to.point.x != 50 || lastShot.to.point.y != 10){
            const positionX: number = lastShot? lastShot.to.point.x : 10;
            const positionY: number = lastShot? lastShot.to.point.y : 10;
            const nextShot: IShot = {from:{x:positionX, y:positionY}, to:{x:50, y:10}};
            this.shots.push(new ShotModel(nextShot, this.shots.length+1));
        }
    }

    elmnts: PointModel[] = [];
    canMove: boolean = false;
    @action startMoving(pointModel: PointModel){
        this.shots.forEach(shot => {
                if(pointModel.point.x == shot.from.point.x && pointModel.point.y == shot.from.point.y){this.elmnts.push(shot.from);}
                if(pointModel.point.x == shot.to.point.x && pointModel.point.y == shot.to.point.y){this.elmnts.push(shot.to);}
            })
        this.canMove = true;
    }
    @action stopMoving(){
        this.elmnts = [];
        this.canMove = false;
    }

    @action move(mouseX: number, mouseY: number){
        //console.log(mouseX + " " + mouseY);

        if(this.canMove){
            this.elmnts.forEach(elm => {
                elm.point.x = mouseX;
                elm.point.y = mouseY;
            })
        }

       // if(this.canMove){
       //     this.elmntMove.point.x=mouseX;
       //     this.elmntMove.point.y=mouseY;
       // }
    }
}
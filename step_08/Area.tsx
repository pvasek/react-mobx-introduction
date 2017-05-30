import * as React from 'react';
import { Component } from 'react';
import { observable, action  } from 'mobx';
import { observer } from "mobx-react";

export interface AreaProps{
    url: string;
}

export interface Data{
    Areas: Area[];
}
export interface Area{
    Name: string;
    AreaCode: number;
    Outline : string[];
}

export class Point{
    x: number;
    y: number;
    z: number;
    previousPoint: Point;

    constructor(data: string, previousPoint: Point){
        const splittedData = data.split(",");
        this.x = Number(splittedData[0]);
        this.y = Number(splittedData[1]);
        this.z = Number(splittedData[2]);
        this.previousPoint = previousPoint;
    }
}

@observer
export class Area extends Component<AreaProps,{}>{
    @observable data: Data;
    @observable points: string[] = [];
    loadData(){
        fetch(this.props.url).then(response =>  response.json().then(data => {
            if(!this.data){
                this.data = data;
            }
        }))
    }
    manageData(){
        this.data.Areas[0].Outline.forEach(line => {
            const tempPoints = line.split(',');
            this.points.push(tempPoints[0] + "," + tempPoints[1]);
        })
    }

    render(){
        this.loadData();
        if(!this.data){return <span>No data</span>}
        this.manageData();
        return(
            //<g stroke="black">
               //{this.points.map(point => 
               //     <path key="0" d={"M " + point.previousPoint.x + " " + point.previousPoint.y + " l " + point.x + " " + point.y } />
               // )}
            //</g>
            <polygon fill="yellow" points={this.points.join(" ")}/>
        )
    }
}
import * as React from 'react';
import { Component } from 'react';
import { observable, action  } from 'mobx';
import { observer } from "mobx-react";

export interface AreasProps{
    url: string;
}

export interface Data{
    Areas: IArea[];
}
export interface IArea{
    Name: string;
    AreaCode: number;
    Outline : string[];
}

export class AreaMap {
    points: string[] = [];
    name: string;
    constructor(iarea: IArea){
        this.name = iarea.Name;
        this.points = iarea.Outline.map(line => {
            const tempPoints = line.split(',');
            return `${tempPoints[0]},${tempPoints[1]}`;
        });
    }
};

@observer
export class Areas extends Component<AreasProps,{}>{
    @observable data: Data;
    @observable areas: AreaMap[] = [];
    loadData(){
        fetch(this.props.url).then(response =>  response.json().then(data => {
            if(!this.data){
                this.data = data;
            console.log("Data loaded")
            }
        }));
    }
    manageData(){
        this.data.Areas.forEach(area => {
            this.areas.push(new AreaMap(area));
        });
    }

    render(){
        !this.data? this.loadData():null;
        if(!this.data){return <span>No data</span>}
        this.manageData();
        return(
            <g offset="100">
                {this.areas.map(area =>
                    <polygon key={this.areas.indexOf(area)} className={area.name} points={area.points.join(" ")}/>
                )}
            </g>
        )
    }
}
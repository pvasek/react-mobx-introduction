import * as React from 'react';
import { Component } from 'react';
import { observable, action  } from 'mobx';
import { observer } from "mobx-react";
import { IArea, IData } from "./DataModel";
import { MapComponent } from "./MapComponent";

export interface AreasProps{
    data: IData;
    padding: number;
}


export class AreaMap {
    points: string[] = [];
    name: string;
    constructor(iarea: IArea, padding: number){
        this.name = iarea.Name;
        this.points = iarea.Outline.map(line => {
            let point = MapComponent.getPoint(line);
            return `${point.x+padding},${point.y+padding}`;
        });
    }
};

@observer
export class Areas extends Component<AreasProps,{}>{
    @observable areas: AreaMap[] = [];
    
    manageData(){
        this.props.data.Areas.forEach(area => {
            this.areas.push(new AreaMap(area, this.props.padding));
        });
    }

    render(){
        if(!this.props.data){return <span>No data</span>}
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
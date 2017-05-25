import * as React from 'react';
import { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from "mobx-react";
import { Shot, ShotListModel } from "./DataModel";

export interface MapComponentProps{
    shots: ShotListModel;
    width: number;
    height: number;
}

@observer
export class MapComponent extends Component<MapComponentProps, {}>{
    private padding: number = 5;
    render(){
        return(
            <svg height={this.props.height} width={this.props.width}>
                {this.props.shots.shots.map(shot =>
                <g key={shot.key}>
                    <path stroke="red" d={"M " + (shot.from.point.x + this.padding) + " " + (shot.from.point.y + this.padding) + "L" + (shot.to.point.x + this.padding) + " " + (shot.to.point.y + this.padding)} />
                    <circle stroke="black" cx={shot.from.point.x + this.padding} cy={shot.from.point.y + this.padding} r="3" />
                    <circle stroke="black" cx={shot.to.point.x + this.padding} cy={shot.to.point.y + this.padding} r="3" />
                </g>
                )}
            </svg>
        );
    }   
}
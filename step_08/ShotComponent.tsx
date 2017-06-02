
import * as React from 'react';
import { Component } from "react";
import { ShotModel, ShotListModel } from "./ShotList";
import { observer } from "mobx-react";

export interface ShotProps {
    shot: ShotModel;
    padding: number;
    shots: ShotListModel;
}

@observer
export class ShotComponent extends Component<ShotProps, {}>{
    render(){
        const shot = this.props.shot;
        const padding = this.props.padding;
        const textX = padding + (shot.from.point.x + shot.to.point.x)/2 - 2;
        const textY = padding + (shot.from.point.y + shot.to.point.y)/2 - 2;
        const textDegrees = Math.atan((shot.from.point.y - shot.to.point.y)/(shot.from.point.x - shot.to.point.x)) * 180 / Math.PI;
        
        return(
            <g id="group">
                <path stroke="red" strokeWidth="2" 
                    d={"M " + (shot.from.point.x + padding) + " " + (shot.from.point.y + padding) + "L" + (shot.to.point.x + padding) + " " + (shot.to.point.y + padding)} 
                />
                <circle className="draggable" stroke="black" 
                    onMouseDown={() => this.props.shots.startMoving(shot.from)}
                    cx={shot.from.point.x + padding} cy={shot.from.point.y + padding} r="3" />
                <circle className="draggable" stroke="black"
                    onMouseDown={() => this.props.shots.startMoving(shot.to)} 
                    cx={shot.to.point.x + padding} cy={shot.to.point.y + padding} r="3" />
                <text transform={"rotate(" + textDegrees + " " + textX + "," + textY + ")"} 
                    x={textX}
                    y={textY} fontSize="10">{shot.key}
                </text>
            </g>
        )
    }
}
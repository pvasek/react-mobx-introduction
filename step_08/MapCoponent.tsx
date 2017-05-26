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
    private padding: number = 15;

    mouseDown(){
        console.log("click");
        this.props.shots.onAddShot();
    }
    move(){
        console.log("hej");
    }
    
    render(){
        return(
            <div id="svg">
                <svg onMouseMove={(event) => this.props.shots.move(event.clientX-this.padding, event.clientY-this.padding)} 
                     onMouseUp={() => this.props.shots.stopMoving()}
                     onMouseDown={(event) => console.log(event.target)}
                     viewBox={"0 0 " + (this.props.width+(this.padding*2)) + " " + (this.props.height+(this.padding*2))} preserveAspectRatio="xMinYMin meet" >
                    {this.props.shots.shots.map(shot =>
                    <g key={shot.key}>
                        <path stroke="red" strokeWidth="3" d={"M " + (shot.from.point.x + this.padding) + " " + (shot.from.point.y + this.padding) + "L" + (shot.to.point.x + this.padding) + " " + (shot.to.point.y + this.padding)} />
                        <circle className="draggable" stroke="black" 
                            onMouseDown={() => this.props.shots.startMoving(shot.from)}
                            cx={shot.from.point.x + this.padding} cy={shot.from.point.y + this.padding} r="5" />
                        <circle className="draggable" stroke="black"
                            onMouseDown={() => this.props.shots.startMoving(shot.to)} 
                            cx={shot.to.point.x + this.padding} cy={shot.to.point.y + this.padding} r="5" />
                    </g>
                    )}
                </svg>
            </div>
        );
    } 
}
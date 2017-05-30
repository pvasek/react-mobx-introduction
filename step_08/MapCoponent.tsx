import * as React from 'react';
import { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from "mobx-react";
import { Shot, ShotListModel } from "./DataModel";
import { Area } from "./Area";

export interface MapComponentProps{
    shots: ShotListModel;
    width: number;
    height: number;
}

@observer
export class MapComponent extends Component<MapComponentProps, {}>{
    private padding: number = 15;
    
    render(){
        return(
            <div id="svg">
                <svg id="svgMap" onMouseMove={(event) =>{ 
                    if(document.querySelector("#group")){
                            var matrix  = (document.querySelector("#group") as any).getScreenCTM();
                            const m: SVGMatrix = matrix.inverse();
                            const mouseX = event.clientX;
                            const mouseY = event.clientY;
                            const x = m.a*mouseX + m.c*mouseY + m.e;
                            const y = m.b*mouseX + m.d*mouseY + m.f;                            
                            //console.log('position: ', this.position, 'result: ', correctPosition, xx, yy)
                            this.props.shots.move(Math.round(x-this.padding), Math.round(y-this.padding))}
                            }
                        }
                     onMouseUp={() => this.props.shots.stopMoving()}
                     viewBox={"0 0 " + (this.props.width+(this.padding*2)) + " " + (this.props.height+(this.padding*2))} >
                     <Area url="http://localhost:8080/MapsHoleMap.json" />
                     {this.props.shots.shots.map(shot =>
                        <g key={shot.key} id="group" transform="translate(20, 30) rotate(50, 50, 45)">
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
import * as React from 'react';
import { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from "mobx-react";
import { Shot, ShotListModel } from "./DataModel";
import { Areas } from "./Areas";

export interface MapComponentProps{
    shots: ShotListModel;
    width: number;
    height: number;
}

@observer
export class MapComponent extends Component<MapComponentProps, {}>{
    
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
                            this.props.shots.move(Math.round(x), Math.round(y))}
                            }
                        }
                     onMouseUp={() => this.props.shots.stopMoving()}
                     viewBox={"0 0 " + (this.props.width) + " " + (this.props.height)} >
                     <Areas url="http://localhost:8080/MapsHoleMap.json" />
                     {this.props.shots.shots.map(shot =>
                        <g key={shot.key} id="group">
                            <path stroke="red" strokeWidth="2" d={"M " + (shot.from.point.x) + " " + (shot.from.point.y) + "L" + (shot.to.point.x) + " " + (shot.to.point.y)} />
                            <circle className="draggable" stroke="black" 
                                onMouseDown={() => this.props.shots.startMoving(shot.from)}
                                cx={shot.from.point.x} cy={shot.from.point.y} r="3" />
                            <circle className="draggable" stroke="black"
                                onMouseDown={() => this.props.shots.startMoving(shot.to)} 
                                cx={shot.to.point.x} cy={shot.to.point.y} r="3" />
                        </g>
                     )}
                </svg>
            </div>
        );
    } 
}
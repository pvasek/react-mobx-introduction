import * as React from 'react';
import { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from "mobx-react";
import { IShot, IData, IPoint } from "./DataModel";
import { Areas } from "./Areas";
import { LineGrid } from "./LineGrid";
import { PointGrid } from "./PointGrid"
import { ShotListModel, ShotModel } from "./ShotList";
import { Data } from "./FetchData";
import { App } from "./App";

export interface MapComponentProps{
    shotList: ShotListModel;
    width: number;
    height: number;
}

@observer
export class MapComponent extends Component<MapComponentProps, {}>{
    @observable response: Data;
    render(){
        !this.response? this.response = new Data("http://localhost:8080/MapsHoleMap.json"):null;
        if(!this.response.loaded){return <span>Loading data...</span>}
        const holeGridStepping: number = this.response.data.HoleGrid.Step;
        const padding: number = holeGridStepping;
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
                            this.props.shotList.move(Math.round(x - padding), Math.round(y - padding))}
                            }
                        }
                     onMouseUp={() => this.props.shotList.stopMoving()}
                     viewBox={App.offSet.x + " " + App.offSet.y + " " + (this.props.width + padding) + " " + (this.props.height + padding)} >
                     <LineGrid windowWidth={this.props.width + padding} step={holeGridStepping} gridOrigin={Data.getPoint(this.response.data.HoleGrid.Origin)} />
                     <Areas data={this.response.data} padding={padding} />
                     <PointGrid shotList={this.props.shotList} windowWidth={this.props.width + padding} fontSize={6} step={holeGridStepping} gridOrigin={Data.getPoint(this.response.data.HoleGrid.Origin)} />
                     {this.props.shotList.shots.map(shot =>
                        <ShotComponent key={shot.key} shot={shot} shots={this.props.shotList} padding={padding} />
                     )}
                </svg>
            </div>
        );
    } 
}

export interface ShotProps{
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
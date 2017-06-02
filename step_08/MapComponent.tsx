import * as React from 'react';
import { Component } from 'react';
import { observable } from 'mobx';
import { observer } from "mobx-react";
import { Areas } from "./Areas";
import { LineGrid } from "./LineGrid";
import { PointGrid } from "./PointGrid"
import { ShotListModel } from "./ShotList";
import { Data } from "./LoadData";
import { App } from "./App";
import { ShotComponent } from "./ShotComponent";

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

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
import { ZoomableComponent } from "./ZoomableComponent";

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
                <ZoomableComponent defaultWidth={this.props.width} defaultHeight={this.props.height} padding={padding}
                 xPosition={App.offSet.x} yPosition={App.offSet.y} shotList={this.props.shotList}>

                    <LineGrid windowWidth={this.props.width + padding} step={holeGridStepping} gridOrigin={Data.getPoint(this.response.data.HoleGrid.Origin)} />
                    <Areas data={this.response.data} padding={padding} />
                    <PointGrid shotList={this.props.shotList} windowWidth={this.props.width + padding} fontSize={6} step={this.response.data.HoleGrid.Step}
                     gridOrigin={Data.getPoint(this.response.data.HoleGrid.Origin)} />
                     
                    {this.props.shotList.shots.map(shot =>
                       <ShotComponent key={shot.key} shot={shot} shots={this.props.shotList} padding={padding} />
                    )}
                </ZoomableComponent>
            </div>
        );
    } 
}

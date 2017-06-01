import * as React from 'react';
import { Component } from 'react';
import { ShotList, ShotListModel } from "./ShotList";
import { MapComponent } from "./MapComponent";
import { IPoint } from "./DataModel";

export class App extends Component<{},{}> {
    //shots = [{from:{x:0,y:0}, to:{x:100, y:200}}, {from:{x:100,y:200}, to:{x:200, y:50}}];
    shotListModel: ShotListModel = new ShotListModel;
    static offSet: IPoint = {x: 663641, y: 7455053}
    render(){
        return (
            <div id="container">
                <MapComponent width={620} height={220} shotList={this.shotListModel} />
                <ShotList model={this.shotListModel}/>
            </div>
        );
    }
}
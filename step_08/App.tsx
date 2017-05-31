import * as React from 'react';
import { Component } from 'react';
import { ShotList, ShotListModel } from "./ShotList";
import { MapComponent } from "./MapComponent";

export class App extends Component<{},{}> {
    //shots = [{from:{x:0,y:0}, to:{x:100, y:200}}, {from:{x:100,y:200}, to:{x:200, y:50}}];
    shotListModel: ShotListModel = new ShotListModel;
    render(){
        return (
            <div id="container">
                <MapComponent width={620} height={200} shots={this.shotListModel} />
                <ShotList model={this.shotListModel}/>
            </div>
        );
    }
}
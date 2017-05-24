import * as React from 'react';
import { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from "mobx-react";
import { ShotListModel } from "./DataModel";

@observer
export class ShotList extends Component<{},{}>{
    shotListModel: ShotListModel = new ShotListModel;

    render(){
        return (
            <div>
                <label>Shots</label>
                <hr />
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>From</th> 
                            <th colSpan={2}>To</th>  
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.shotListModel.shots.map(shot => 
                            <tr key={shot.key}>
                            <td><input onChange={shot.from.onChangeX}value={shot.from.point.x} /></td>
                            <td><input onChange={shot.from.onChangeY}value={shot.from.point.y} /></td>
                            <td><input onChange={shot.to.onChangeX}value={shot.to.point.x} /></td>
                            <td><input onChange={shot.to.onChangeY}value={shot.to.point.y} /></td>
                            <td><button onClick={shot.onClickOnDelete}>-</button></td>
                    </tr> )}
                    </tbody>
                </table> 
                <button onClick={this.shotListModel.onAddShot}>Add shot</button>
            </div>
        );
    }
}
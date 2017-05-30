import * as React from 'react';
import { Component } from 'react';
import { observable, action, autorun } from 'mobx';
import { observer } from "mobx-react";
import { ShotListModel, Shot } from "./DataModel";

export interface ShotListProps{
    model: ShotListModel;
}

@observer
export class ShotList extends Component<ShotListProps,{}>{
    
    render(){
        return (
            <div id="shotList">
                <h2>Golf shots</h2>
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
                        {this.props.model.shots.map
                            (shot => 
                                <tr key={shot.key}>
                                    <td><input onChange={shot.from.onChangeX}value={shot.from.point.x} /></td>
                                    <td><input onChange={shot.from.onChangeY}value={shot.from.point.y} /></td>
                                    <td><input onChange={shot.to.onChangeX}value={shot.to.point.x} /></td>
                                    <td><input onChange={shot.to.onChangeY}value={shot.to.point.y} /></td>
                                    <td><button onClick={e => this.props.model.deleteShot(shot)}>-</button></td>
                                </tr> 
                            )
                        }
                    </tbody>
                </table> 
                <button onClick={this.props.model.onAddShot}>Add shot</button><span>{"Shot count: " + this.props.model.shots.length}</span>
            </div>
        );
    }
}
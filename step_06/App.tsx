import * as React from 'react';
import { Component } from 'react';
import { PersonDetail, PersonDetailModel } from './PersonDetail';

export interface IAppState {
    person: any;
}

export class App extends Component<{}, IAppState> {
    
    personDetailModel = new PersonDetailModel();

    /*componentWillMount() {
        this.personDetailModel.onLoad();
    }*/

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.personDetailModel.onLoad}>Load</button>
                    <button>Save</button>
                </div>
                <PersonDetail personDetailModel={this.personDetailModel}/>
            </div>            
        );
    }
}
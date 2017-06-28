import * as React from 'react';
import { Component } from 'react';
import { restService } from '../common';
import { PersonDetail } from './PersonDetail';

export interface IAppState {
    person: any;
}

export class App extends Component<{}, IAppState> {
    constructor() {
        super();
        this.onLoad = this.onLoad.bind(this);
        this.state = { person: null };
    }

    componentWillMount() {
        // optional chalange - load data after displaying component
        //this.onLoad();
    }

    onLoad() {
        restService
            .get('Person', '1')
            .then((person: any) => {
                this.setState({ person: person});
            });
    }

    render() {
        const { person } = this.state;

        return (
            <div>
                <div>
                    <button onClick={this.onLoad}>Load</button>
                    <button>Save</button>
                </div>
                <PersonDetail person={person}/>
            </div>            
        );
    }
}
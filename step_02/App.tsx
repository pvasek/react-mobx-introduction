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

    onLoad() {
        restService
            .get('Person', '1')
            .then((person: any) => {
                this.setState({ person: person});
            });
    }

    render() {
        return (
            <PersonDetail onLoad={this.onLoad} person={this.state.person}/>
        );
    }
}
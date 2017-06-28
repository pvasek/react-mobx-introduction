import * as React from 'react';
import { Component } from 'react';
import { restService } from '../common';
import { PersonDetail } from './PersonDetail';

export class App extends Component<{}, {}> {

    render() {
        const person = {
            FirstName: 'Static',
            LastName: 'Person'
        };
        return (
            <div>
                <div>
                    <button>Load</button>
                    <button>Save</button>
                </div>
                <PersonDetail person={person}/>
            </div>                        
        );
    }
}
import * as React from 'react';
import { Component } from 'react';
import { restService } from '../common';

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
                <div className="form">
                    <div>
                        <label>First Name:</label>
                        <input type="text" value={person.LastName}/>
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" value={person.FirstName}/>
                    </div>
                    <div>
                        <label>Country:</label>
                        <select />
                    </div>
                </div>
            </div>
        );
    }
}
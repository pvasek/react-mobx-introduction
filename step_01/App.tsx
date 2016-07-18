import * as React from 'react';
import { Component } from 'react';
import { restService } from '../common';

export class App extends Component<{}, {}> {

    render() {
        return (
            <div className="form">
                <div>
                    <button>Load</button>
                    <button>Save</button>
                </div>
                <div>
                    <label>First Name:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Country:</label>
                    <select />
                </div>
            </div>
        );
    }
}
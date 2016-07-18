import * as React from 'react';
import { Component } from 'react';

export interface IPersonDetailProps {
    person: any;
    onLoad: () => void;
}

export class PersonDetail extends Component<IPersonDetailProps, {}> {    
    render() {
        const { person, onLoad } = this.props;

        if (!person) {
            return (
                <div>
                    <div>
                        <button onClick={onLoad}>Load</button>                    
                    </div>
                    <div>No data</div>
                </div>
            );
        }

        return (
            <div className="form">
                <div>
                    <button onLoad={onLoad}>Load</button>
                    <button>Save</button>
                </div>
                <div>
                    <label>First Name:</label>
                    <input type="text" value={person.FirstName}/>
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={person.LastName}/>
                </div>
                <div>
                    <label>Country:</label>
                    <select />
                </div>
            </div> 
        );       
    }
}
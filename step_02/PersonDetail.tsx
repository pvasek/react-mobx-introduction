import * as React from 'react';
import { Component } from 'react';

export interface IPersonDetailProps {
    person: any;
}

export class PersonDetail extends Component<IPersonDetailProps, {}> {

    render() {
        const { person } = this.props;

        return (
            <div className="form">
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
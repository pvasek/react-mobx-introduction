import * as React from 'react';
import { Component } from 'react';

export interface IPersonDetailProps {
    person: any; 
}

export interface IPersonDetailState {
    FirstName?: string;
    LastName?: string;
    FirstNameErrors?: string[];
    LastNameErrors?: string[];    
}

const isRequired =  (value) => {
    if (!value || value === '') {
        return ['Field is required'];
    }
    return [];
};

export class PersonDetail extends Component<IPersonDetailProps, IPersonDetailState> {

    constructor() {
        super();
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
    }

    componentWillReceiveProps(nextProps: IPersonDetailProps) {
        this.setState(nextProps.person);
    }

    onFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({FirstName: e.target.value});
    }

    onLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({LastName: e.target.value});
    }

    render() {
       const { person } = this.props;
        if (!person) {
            return <span>No data</span>;
        }

        const { FirstName, LastName } = this.state;

        return (
            <div className="form">
                <div>
                    <label>First Name:</label>
                    <input type="text" value={FirstName} onChange={this.onFirstNameChange}/>
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={LastName}  onChange={this.onLastNameChange}/>
                </div>
                <div>
                    <label>Country:</label>
                    <select />
                </div>
            </div> 
        );       
    }
}
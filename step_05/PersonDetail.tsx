import * as React from 'react';
import { Component } from 'react';

export interface IPersonDetailProps {
    person: any; 
}

export interface IFieldParent {
    state: any;
    setState(state: any);
}

export class Field {
    constructor(
        private parent: IFieldParent, 
        private name: string, 
        private validator: (value: any) => string[] = null) {

        //TODO
    }

    setState(value: any, errors: string[] = []) {
        //TODO
    }

    get value(): any {
        //TODO
        return '';
    }

    get errors(): string[] {
        //TODO
        return [];
    }

    onChange(e: KeyboardEvent) {
        //TODO
    }
}

const isRequired =  (value) => {
    if (!value || value === '') {
        return ['Field is required'];
    }
    return [];
};

export class PersonDetail extends Component<IPersonDetailProps, any> {

    constructor() {
        super();
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
    }

    componentWillReceiveProps(nextProps: IPersonDetailProps) {
        this.setState({
            FirstName: nextProps.person.FirstName,
            LastName: nextProps.person.LastName,
            FirstNameErrors: [],
            LastNameErrors: [],
        });
    }

    onFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const errors = isRequired(value);
        this.setState({
            FirstName: value,
            FirstNameErrors: errors,
        });
    }

    onLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const errors = isRequired(value);
        this.setState({
            LastName: value,
            LastNameErrors: errors,
        });
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
                    {this.state.FirstNameErrors.map(i => <div key={i} className="error">{i}</div>)}
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={LastName}  onChange={this.onLastNameChange}/>
                    {this.state.LastNameErrors.map(i => <div key={i} className="error">{i}</div>)}                    
                </div>
                <div>
                    <label>Country:</label>
                    <select />
                </div>
            </div> 
        );       
    }
}
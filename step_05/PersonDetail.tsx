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
        this.onChange = this.onChange.bind(this);
    }

    setState(value: any, errors: string[] = []) {
        //TODO
        this.parent.setState({
            [this.name]: {
                value: value,
                errors: errors
            }
        });
    }

    get value(): any {
        //TODO
        return this.parent.state[this.name].value;
    }

    get errors(): string[] {
        //TODO
        return this.parent.state[this.name].errors? this.parent.state[this.name].errors : [];
    }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        //TODO
        const value = e.target.value;
        this.setState(value, this.validator(value))
    }
}

const isRequired =  (value) => {
    if (!value || value === '') {
        return ['Field is required'];
    }
    return [];
};

export class PersonDetail extends Component<IPersonDetailProps, any> {

    FirstName = new Field(this, "FirstName", isRequired);
    LastName = new Field(this, "LastName", isRequired);

    componentWillReceiveProps(nextProps: IPersonDetailProps) {
        this.FirstName.setState(nextProps.person.FirstName, nextProps.person.FirstNameErrors);
        this.LastName.setState(nextProps.person.LastName, nextProps.person.LastNameErrors);
    }

    

    render() {
       const { person } = this.props;
        if (!person) {
            return <span>No data</span>;
        }

        return (
            <div className="form">
                <div>
                    <label>First Name:</label>
                    <input type="text" value={this.FirstName.value} onChange={this.FirstName.onChange}/>
                    {this.FirstName.errors.map(i => <div key={i} className="error">{i}</div>)}
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={this.LastName.value}  onChange={this.LastName.onChange}/>
                    {this.LastName.errors.map(i => <div key={i} className="error">{i}</div>)}                    
                </div>
                <div>
                    <label>Country:</label>
                    <select />
                </div>
            </div> 
        );       
    }
}
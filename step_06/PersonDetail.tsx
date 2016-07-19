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

        const defaultValidator = (value: any): string[] => [];
        this.validator = validator || defaultValidator; 
        this.onChange = this.onChange.bind(this);
    }

    private errorsSufix = '_errors'; 

    setState(value: any, errors: string[] = []) {
        this.parent.setState({
            [this.name]: value,
            [this.name + this.errorsSufix]: errors
        });
    }

    get value(): any {
        return this.parent.state[this.name]
    }

    get errors(): string[] {
        return this.parent.state[this.name + this.errorsSufix]
    }

    onChange(e: KeyboardEvent) {
        const value = (e.target as HTMLInputElement).value;
        const errors = this.validator(value);            
        this.setState(value, errors);
    }
}

const isRequired =  (value) => {
    if (!value || value === '') {
        return ['Field is required'];
    }
    return [];
};

export class PersonDetail extends Component<IPersonDetailProps, any> {

    private FirstName = new Field(this, 'FirstName', isRequired);
    private LastName = new Field(this, 'LastName', isRequired);

    componentWillReceiveProps(nextProps: IPersonDetailProps) {
        this.FirstName.setState(nextProps.person.FirstName);
        this.LastName.setState(nextProps.person.LastName);
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
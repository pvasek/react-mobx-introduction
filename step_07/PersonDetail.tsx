import * as React from 'react';
import { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';


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

    @observable value: any = null;
    @observable errors: string[] = [];

    onChange(e: KeyboardEvent) {
        const value = (e.target as HTMLInputElement).value;
        this.value = value;
        this.errors = this.validator(value);            
    }
}

const isRequired =  (value) => {
    if (!value || value === '') {
        return ['Field is required'];
    }
    return [];
};

@observer
export class PersonDetail extends Component<IPersonDetailProps, any> {

    private FirstName = new Field(this, 'FirstName', isRequired);
    private LastName = new Field(this, 'LastName', isRequired);

    componentWillReceiveProps(nextProps: IPersonDetailProps) {
        this.FirstName.value = nextProps.person.FirstName;
        this.LastName.value = nextProps.person.LastName;
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
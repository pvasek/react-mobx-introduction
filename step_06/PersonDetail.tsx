import * as React from 'react';
import { Component } from 'react';
import { observable, computed, action} from 'mobx';
import { observer } from 'mobx-react';
import { restService } from "../common/restService";

export interface IPersonDetailProps {
    personDetailModel: PersonDetailModel;
}

const isRequired =  (value) => {
    if (!value || value === '') {
        return ['Field is required'];
    }
    return [];
};

export class PersonDetailModel{
    
    @action.bound onLoad() {
        restService
            .get('Person', '1')
            .then((person: any) => {
                this.FirstName.value = person.FirstName;
                this.LastName.value = person.LastName;
            });
    }
    
    FirstName = new Field('FirstName', isRequired);
    LastName = new Field('LastName', isRequired);
}


export class Field {
    constructor(
        private name: string, 
        private validator: (value: any) => string[] = null) {

        const defaultValidator = (value: any): string[] => [];
        this.validator = validator || defaultValidator; 
        this.onChange = this.onChange.bind(this);
    }
    @observable errors:string[] = [];
    @observable value = '';

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.value = e.target.value;
        this.errors = this.validator(this.value);   
    }
}


@observer
export class PersonDetail extends Component<IPersonDetailProps, any> {

    render() {
       const { personDetailModel } = this.props; 
        if (!personDetailModel || personDetailModel.FirstName.value === "" && personDetailModel.LastName.value === "") {
            return <span>No data</span>;
        }
        return (
            <div className="form">
                <div>
                    <label>First Name:</label>
                    <input type="text" value={personDetailModel.FirstName.value} onChange={personDetailModel.FirstName.onChange}/>
                    {personDetailModel.FirstName.errors.map(i => <div key={i} className="error">{i}</div>)}
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={personDetailModel.LastName.value}  onChange={personDetailModel.LastName.onChange}/>
                    {personDetailModel.LastName.errors.map(i => <div key={i} className="error">{i}</div>)}
                </div>
                <div>
                    <label>Country:</label>
                    <select />
                </div>
            </div> 
        );       
    }
}
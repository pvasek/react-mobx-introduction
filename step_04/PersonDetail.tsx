import * as React from 'react';
import { Component } from 'react';
import { maxLength, isRequired } from "./validations";

export interface IPersonDetailProps {
    person: any; 
}

export interface IPersonDetailState {
    FirstName?: string;
    LastName?: string;
    FirstNameErrors?: string[];
    LastNameErrors?: string[];  
}

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
        console.log(e.target.value.length);
        this.setState({FirstNameErrors: [...maxLength(e.target.value), ...isRequired(e.target.value)]}, () => console.log(this.state.FirstNameErrors.length));
        this.setState({FirstName: e.target.value});
    }

    onLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            LastNameErrors: [...maxLength(e.target.value), ...isRequired(e.target.value)],
            LastName: e.target.value});
    }

    render() {
       const { person } = this.props;
       
        if (!person) {
            return <span>No data</span>;
        }

        const {
            FirstName,
            FirstNameErrors = [],
            LastName,
            LastNameErrors = [],
        } = this.state;

        const className = FirstNameErrors.length > 0 ? 'error' : '';
        const errorDiv = LastNameErrors.map(i => <div key={i} className="error">{i}</div>);
        
        return (
            <div className="form">
                <div>
                    <label className={className} >First Name:</label>
                    <input type="text" value={FirstName} onChange={this.onFirstNameChange}/>
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={LastName}  onChange={this.onLastNameChange}/>
                    {errorDiv}
                </div>
                <div>
                    <label>Country:</label>
                    <select />
                </div>
            </div> 
        );       
    }
}
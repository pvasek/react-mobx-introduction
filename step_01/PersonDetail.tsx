import * as React from 'react';
import { Component } from 'react';

export interface IPersonDetailProps {
    person: { FirstName: string, LastName: string };
}


export class PersonDetail extends Component<IPersonDetailProps, {}>{

    constructor() {
        super();
        this.onFirstNameChangeHandler = this.onFirstNameChangeHandler.bind(this);
        this.onLastNameChangeHandler = this.onLastNameChangeHandler.bind(this);
    }
    state = {
            FirstName: '',
            LastName: ''
        }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.person);
    }

    onFirstNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({FirstName: e.target.value});
    }

    onLastNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({LastName: e.target.value});
    }

    render(){
        if(this.props.person === null){
              return <span>Not Loaded</span>  
            }
        else{
            return (
                <div className="form">
                        <div>
                            <label>First Name:</label>
                            <input onChange={this.onFirstNameChangeHandler} type="text" value={this.state.FirstName}/>
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input onChange={this.onLastNameChangeHandler} type="text" value={this.state.LastName}/>
                        </div>
                        <div>
                            <label>Country:</label>
                            <select />
                        </div>
                    </div>
            )
        }
    }
}
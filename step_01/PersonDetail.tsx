import * as React from 'react';
import { Component } from 'react';

export interface IPersonDetailProps {
    person: any;
}

export class PersonDetail extends Component<IPersonDetailProps, {}>{
    render(){
        if(this.props.person === null){
              return <span>Not Loaded</span>  
            }
        else{
            return (
                <div className="form">
                        <div>
                            <label>First Name:</label>
                            <input type="text" value={this.props.person.FirstName}/>
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input type="text" value={this.props.person.LastName}/>
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
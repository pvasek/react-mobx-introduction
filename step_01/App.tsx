import * as React from 'react';
import { Component } from 'react';
import { restService } from '../common';
import { PersonDetail } from './PersonDetail';

export class App extends Component<{}, {}> {
    constructor(){
        super();
        this.load = this.load.bind(this);
    }
    state = {
        person: null
    }

    load(e: React.MouseEvent<HTMLButtonElement>){
        //alert("Clicked");
        restService.get('Person', '1').then(person => {
            //alert(person.FirstName);
            this.setState({person: person});
        })
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.load}>Load</button>
                    <button>Save</button>
                </div>
                <PersonDetail person={this.state.person} />
            </div>
        );
    }
}
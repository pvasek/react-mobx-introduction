import * as React from 'react';
import { Component } from 'react';
import { ShotList } from "./ShotList";

export class App extends Component<{},{}> {
    render(){
        return (
            <div >
                <div></div>
                <ShotList />
            </div>
        );
    }
}
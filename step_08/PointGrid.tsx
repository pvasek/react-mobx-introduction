import * as React from 'react';
import { Component } from 'react';

export interface LineGridProps{
    step: number;
}

export class PointGrid extends Component<LineGridProps, {}>{
    render(){
        return(
            <g>
                <defs>
                    <pattern id="pointGrid" patternUnits="userSpaceOnUse" width={this.props.step} height={this.props.step}>
                        <circle cx="0" cy="0" r="0.5" fill="black" />
                    </pattern>         
                </defs>
                <rect width="100%" height="100%" fill="url(#pointGrid)" />
            </g>
        );
    }
}
import * as React from 'react';
import { Component } from 'react';
import { IPoint } from "./DataModel";

export interface LineGridProps{
    step: number;
    gridOrigin: IPoint;
    windowWidth: number;
}


export class LineGrid extends Component<LineGridProps, {}>{
    
    render(){
        return(
            <g>
                <defs>
                    <pattern id="lineGrid" x={this.props.gridOrigin.x + this.props.step} y={this.props.gridOrigin.y + this.props.step} patternUnits="userSpaceOnUse" width={this.props.step} height={this.props.step}>
                        <path d={`M ${this.props.step} ${this.props.step} L 0 ${this.props.step} 0 0`} fill="none" stroke="gray" strokeWidth="0.5"/>
                    </pattern>           
                </defs>
                <rect x={this.props.gridOrigin.x} width={ + this.props.windowWidth} height={this.props.gridOrigin.y + this.props.step} fill="url(#lineGrid)" />
            </g>
        );
    }
}
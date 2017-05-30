import * as React from 'react';
import { Component } from 'react';

export interface LineGridProps{
    step: number;
}

export interface Num{
    value: number;
    x: number;
    y: number;
}

export class LineGrid extends Component<LineGridProps, {}>{
    horizontalNums: Num[] = [];
    verticalNums: Num[] = [];
    createNums(){
        let i:number = 1;
        for(var x = this.props.step/6; x < 650; x += this.props.step){
            this.horizontalNums.push({value: i, x: x, y: 15});
            i++;
        }
        i = 2;
        for(var y = 2 * this.props.step - 4; y < 400; y += this.props.step){
            this.verticalNums.push({value: i, y: y, x: 3});
            i++;
        }
    }
    render(){
        this.horizontalNums.length === 0? this.createNums():null;
        return(
            <g>
                <defs>
                    <pattern id="lineGrid" patternUnits="userSpaceOnUse" width={this.props.step} height={this.props.step}>
                        <path d={`M 0 ${this.props.step} L ${this.props.step} ${this.props.step} ${this.props.step} 0`} fill="none" stroke="gray" strokeWidth="0.5"/>
                    </pattern>           
                </defs>
                <rect width="100%" height="100%" fill="url(#lineGrid)" />
                {this.horizontalNums.map(num => <text key={num.value} x={num.x} y={num.y}>{num.value}</text>)}
                {this.verticalNums.map(num => <text key={num.value} x={num.x} y={num.y}>{num.value}</text>)}
            </g>
        );
    }
}
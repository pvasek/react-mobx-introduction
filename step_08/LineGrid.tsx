import * as React from 'react';
import { Component } from 'react';
import { IPoint } from "./DataModel";

export interface LineGridProps{
    step: number;
    fontSize: number;
    gridOrigin: IPoint;
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
        let i:number = 0;
        for(var x = this.props.gridOrigin.x; x <= 620; x += this.props.step){
            this.horizontalNums.push({value: i, x: x, y: this.props.fontSize + this.props.gridOrigin.y % this.props.step});
            i++;
        }
        i = 1;
        for(var y = 2 * this.props.fontSize + (this.props.step - this.props.fontSize) + this.props.gridOrigin.y % this.props.step;
         y < this.props.gridOrigin.y;
         y += this.props.step){
            this.verticalNums.push({value: i, y: y, x: this.props.gridOrigin.x});
            i++;
        }
    }
    render(){
        this.horizontalNums.length === 0? this.createNums():null;
        return(
            <g>
                <defs>
                    <pattern id="lineGrid" x={this.props.gridOrigin.x} y={this.props.gridOrigin.y} patternUnits="userSpaceOnUse" width={this.props.step} height={this.props.step}>
                        <path d={`M 0 ${this.props.step} L ${this.props.step} ${this.props.step} ${this.props.step} 0`} fill="none" stroke="gray" strokeWidth="0.5"/>
                    </pattern>           
                </defs>
                <rect x={this.props.gridOrigin.x} width="620px" height={this.props.gridOrigin.y} fill="url(#lineGrid)" />
                {this.horizontalNums.map(num => <text key={num.value} fontSize={this.props.fontSize} x={num.x} y={num.y}>{num.value}</text>)}
                {this.verticalNums.map(num => <text key={num.value} fontSize={this.props.fontSize} x={num.x} y={num.y}>{num.value}</text>)}
            </g>
        );
    }
}
import * as React from 'react';
import { Component } from 'react';
import { IPoint } from "./DataModel";

export interface LineGridProps{
    step: number;
    gridOrigin: IPoint;
}

export class Sector{
    x: number;
    y: number;
    a: number;
    constructor(x:number, y:number, a:number){
        this.x = x;
        this.y = y;
        this.a = a;
    }
}

export class PointGrid extends Component<LineGridProps, {}>{
    sectors: Sector[] = [];

    createSectors(){
        const step = this.props.step;
        for(var y = this.props.step + this.props.gridOrigin.y%this.props.step; y < this.props.gridOrigin.y; y += step){
            for(var x = this.props.step + this.props.gridOrigin.x; x <= 620; x += step){
                this.sectors.push(new Sector(x, y, step));
            }
        }
    }

    render(){
        if(this.sectors.length == 0){ 
            this.createSectors(); 
        }
        return(
            <g>
                <defs>
                    <pattern id="pointGrid" x={this.props.gridOrigin.x} y={this.props.gridOrigin.y} patternUnits="userSpaceOnUse" width={this.props.step} height={this.props.step}>
                        <circle cx={this.props.step} cy={this.props.step} r="0.5" fill="black" />
                    </pattern>         
                </defs>
                <rect x={this.props.gridOrigin.x} width="620px" height={this.props.gridOrigin.y} fill="url(#pointGrid)" />
                {this.sectors.map(sector => <rect key={this.sectors.indexOf(sector)} onClick={e => console.log(e.target, "Clicked")} className="sector" x={sector.x} y={sector.y} width={sector.a} height={sector.a} />)}
            </g>
        );
    }
}
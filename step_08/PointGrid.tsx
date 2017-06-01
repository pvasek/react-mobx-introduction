import * as React from 'react';
import { Component } from 'react';
import { IPoint, INum } from "./DataModel";
import { ShotListModel } from "./ShotList";
import { App } from "./App";

export interface LineGridProps{
    step: number;
    gridOrigin: IPoint;
    windowWidth: number;
    fontSize: number
    shotList: ShotListModel;
}

export class Sector{
    x: number;
    y: number;
    a: number;
    column: string;
    row: number;
    constructor(x:number, y:number, a:number, column:string, row:number){
        this.x = x;
        this.y = y;
        this.a = a;
        this.column = column;
        this.row = row;
    }
}

export class PointGrid extends Component<LineGridProps, {}>{
    sectorRows: Sector[][] = [];

    createSectors(){
        const fontSize = this.props.fontSize;
        const step = this.props.step;
        const gridOrigin = this.props.gridOrigin;
        const height = gridOrigin.y - App.offSet.y >> 0;
        let rowValue = (height/step - 1) >> 0;
        for(var y = this.props.step + gridOrigin.y - height + height % step; y <= gridOrigin.y; y += step){
            let colValue: number = 0;
            let row: Sector[] = [];
            for(var x = this.props.step + gridOrigin.x; x <= this.props.windowWidth + gridOrigin.x; x += step){
                row.push(new Sector(x, y, step, this.idOf(colValue), rowValue));
                colValue++;
            }
            this.sectorRows.push(row);
            rowValue--;
        }
    }

    horizontalChars: INum[] = [];
    verticalNums: INum[] = [];

    idOf(i) {
        return (i >= 26 ? this.idOf((i / 26 >> 0) - 1) : '') + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i % 26];
    }

    numbering(){
        const fontSize = this.props.fontSize;
        const step = this.props.step;
        const gridOrigin = this.props.gridOrigin;

         for(var i = 0; i < this.sectorRows.length; i++){
             this.verticalNums.push({
                 value: this.sectorRows[i][0].row.toString(),
                 x: this.sectorRows[i][0].x - step,
                 y: this.sectorRows[i][0].y + fontSize + (step - fontSize)/4
             })
         }

         this.horizontalChars = this.sectorRows[0].map(row => ({
                value: row.column,
                x: row.x,
                y: row.y - step + fontSize + (step-fontSize)/4 
            }))
    }

    render(){
        if(this.sectorRows.length == 0){ 
            this.createSectors(); 
            this.numbering();
            
        }

        return(
            <g>
                <defs>
                    <pattern id="pointGrid" x={this.props.gridOrigin.x + this.props.step} y={this.props.gridOrigin.y + this.props.step} patternUnits="userSpaceOnUse" width={this.props.step} height={this.props.step}>
                        <circle cx={0} cy={this.props.step} r="0.5" fill="black" />
                    </pattern>         
                </defs>
                <rect x={this.props.gridOrigin.x} width={this.props.windowWidth + this.props.step} height={this.props.gridOrigin.y + this.props.step} fill="url(#pointGrid)" />
                {this.sectorRows.map(sectorLine =>
                    sectorLine.map(sector =>
                        <rect key={sectorLine.indexOf(sector)} onClick={e => this.props.shotList.onSectorClick(sector)} className="sector" x={sector.x} y={sector.y} width={sector.a} height={sector.a} />))}
                {this.horizontalChars.map(num => <text key={num.value} fontSize={this.props.fontSize} x={num.x} y={num.y}>{num.value}</text>)}
                {this.verticalNums.map(num => <text key={num.value} fontSize={this.props.fontSize} x={num.x} y={num.y}>{num.value}</text>)}
                <circle cx={this.props.gridOrigin.x + this.props.step} cy={this.props.gridOrigin.y + this.props.step} r={1.5} fill="red" />
            </g>
        );
    }
}
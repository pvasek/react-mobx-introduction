import * as React from 'react';
import { observable, action } from 'mobx';
import * as ReactDOM from "@types/react-dom";

// DATAMODEL
export interface IShot{
    from:IPoint;
    to:IPoint;
}
export interface IPoint{
    x:number;
    y:number;
}

export interface IData{
    Areas: IArea[];
    DefaultRotation: number;
    HoleGrid: IGrid;
    GreenGrid: IGrid;
    LaserReferences: ILaserReferences;
}
export interface IArea{
    Name: string;
    AreaCode: number;
    Outline : string[];
}
export interface IGrid{
    Origin: string;
    Step: number;
}
export interface ILaserReferences{
    Name: string;
    LaserType: number;
    ReferencePoints: IReferencePoints[];
}
export interface IReferencePoints{
    Point: string;
    Color: number;
}

export interface Num{
    value: string;
    x: number;
    y: number;
}
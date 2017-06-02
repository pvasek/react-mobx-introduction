import * as React from 'react';
import { Component } from 'react';
import { LineGrid } from "./LineGrid";
import { Areas } from "./Areas";
import { PointGrid } from "./PointGrid";
import { ShotComponent } from "./ShotComponent";
import { ShotListModel } from "./ShotList";
import { Data } from "./LoadData";
import { observable, action } from "mobx/lib/mobx";
import { observer } from "mobx-react";

export interface ZoomableComponentProps{
    defaultWidth: number;
    defaultHeight: number;
    xPosition: number;
    yPosition: number;
    padding: number;
    shotList: ShotListModel;
}

@observer
export class ZoomableComponent extends Component<ZoomableComponentProps, {}>{
    
    @observable magnifyingGlass: magnifyingGlass = new magnifyingGlass(this.props.xPosition, this.props.yPosition, this.props.defaultWidth, this.props.defaultHeight);

    render(){
        const defaultHeight = this.props.defaultHeight;
        const defaultWidth = this.props.defaultWidth;
        const xPosition = this.props.xPosition;
        const yPosition = this.props.yPosition;
        const padding = this.props.padding;

        return(
            <div>
                <svg id="svgMap" onMouseMove={(event) =>{ 
                    if(document.querySelector("#group")){
                        var matrix  = (document.querySelector("#group") as any).getScreenCTM();
                        const m: SVGMatrix = matrix.inverse();
                        const mouseX = event.clientX;
                        const mouseY = event.clientY;
                        const x = m.a*mouseX + m.c*mouseY + m.e;
                        const y = m.b*mouseX + m.d*mouseY + m.f;                            
                        //console.log('position: ', this.position, 'result: ', correctPosition, xx, yy)
                        this.props.shotList.move(Math.round(x - padding), Math.round(y - padding))}
                        }
                    }
                    onMouseUp={() => this.props.shotList.stopMoving()}
                    viewBox={this.magnifyingGlass.zoomAtX + " " + this.magnifyingGlass.zoomAtY + " " + (defaultWidth/this.magnifyingGlass.zoom + padding) + " " + (defaultHeight/this.magnifyingGlass.zoom + padding)} >
                    {this.props.children}
                </svg>
                <div id="moveControls">
                    <svg id="miniMap" viewBox={xPosition + " " + yPosition + " " + (defaultWidth + padding) + " " + (defaultHeight + padding)}
                    onMouseMove={event => {
                        this.magnifyingGlass.onMove(event.clientX, event.clientY);
                    }}>
                        {this.props.children[1]}
                        <rect id="magnifyingGlass" className="draggable" x={this.magnifyingGlass.zoomAtX} y={this.magnifyingGlass.zoomAtY} width={defaultWidth/this.magnifyingGlass.zoom} height={defaultHeight/this.magnifyingGlass.zoom}
                        onMouseDown={() => {
                            this.magnifyingGlass.onSelect();
                        }} 
                        onMouseUp={() => {
                            this.magnifyingGlass.onDeselect();
                        }}/>
                    </svg>
                    <button onClick={()=> this.magnifyingGlass.zoomIn()}>+</button>
                    <button onClick={()=> this.magnifyingGlass.zoomOut()}>-</button>
                </div>
            </div>
        )
    }
}

export class magnifyingGlass{
    @observable zoom: number = 1;
    @observable zoomAtX: number = 0;
    @observable zoomAtY: number = 0;
    defaultWidth: number;
    defaultHeight: number;
    
    private selected: boolean = false;
    private zoomCounter: number = 1;
    //private defaultX: number;
    //private defaultY: number;

    constructor(zoomAtX: number, zoomAtY: number, defaultWidth: number, defaultHeight: number){
        this.zoomAtX = zoomAtX;
        this.zoomAtY = zoomAtY;
        this.defaultHeight = defaultHeight;
        this.defaultWidth = defaultWidth;
        //this.defaultX = zoomAtX;
        //this.defaultY = zoomAtY;
    }

    @action onSelect(){
        this.selected = true;
        console.log(this.zoomAtX, this.zoomAtY);
    }

    @action onDeselect(){
        this.selected = false;
    }

    @action onMove(mouseX: number, mouseY: number){
        if(this.selected && document.querySelector("#miniMap")){
            var matrix  = (document.querySelector("#miniMap") as any).getScreenCTM();
            const m: SVGMatrix = matrix.inverse();
            const x = m.a*mouseX + m.c*mouseY + m.e;
            const y = m.b*mouseX + m.d*mouseY + m.f; 
            //if(x - this.defaultX + this.defaultWidth/(2* this.zoom) < this.defaultWidth){                           
            this.zoomAtX = x - this.defaultWidth/(2 * this.zoom);
            this.zoomAtY = y - this.defaultHeight/(2 * this.zoom);
            //console.log(x,y);
        }
    }

    @action zoomIn(){
        this.zoomCounter++;
        this.zoom = this.zoom * (Math.pow(1.5,2)/1.5);
    }

    @action zoomOut(){
        if(this.zoomCounter > 1){
            this.zoomCounter--;
            this.zoom = this.zoom / (Math.pow(1.5,2)/1.5);
        }
    }
}
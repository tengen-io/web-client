
// Libraries
import React, { Component } from "react";
import R from "ramda";
// Component
import Stone from "./stone";
import GridLine from "./gridLine";
// Style
import style from '../../stylesheets/square.scss';

// Move these into game config
const numberOfSquares = 361;
const corners = [0,18,342,360];
const guides = [60,66,72,174,180,186,288,294,300];

const allSquares = Array.from(
    new Array(numberOfSquares), (val, index) => index
);

const sideTop        = R.filter( (i) =>   0 < i && i <  18,   allSquares )
const sideBottom     = R.filter( (i) => 342 < i && i < 360,   allSquares )
const sideLeft       = R.filter( (i) => i % 19 === 0,         allSquares )
const sideRight      = R.filter( (i) => i % 19 === 18,        allSquares )

function createPositionClass( position ) {
    if ( position === 0 )                   { return "corner top-left" };
    if ( position === 18 )                  { return "corner top-right" };
    if ( position === 342 )                 { return "corner bottom-left" };
    if ( position === 360 )                 { return "corner bottom-right" };
    if ( R.contains(position, sideTop) )    { return "side side-top" };
    if ( R.contains(position, sideBottom) ) { return "side side-bottom" };
    if ( R.contains(position, sideLeft) )   { return "side side-left" };
    if ( R.contains(position, sideRight) )  { return "side side-right" };
    if ( R.contains(position, guides) )     { return "central guide-square" };
    return "central";
}



export default class Square extends Component {

    constructor(props) {
        super(props);
        
        this.addStone = this.addStone.bind(this);
        
        this.state = {
            color: null,
            hasStone: false
         };
    }
    
    addStone() {
        const colors = ['black', 'white'];
        const color = this.state.color || colors[Math.floor(Math.random() * 2)];
        
        if ( !this.state.hasStone ) {
            this.setState({
                color: color,
                hasStone: true
            });
        }
        
    }
    
    render() {

    return (
        <section
            className={
                "square square-" + this.props.number
                + " "
                + ( this.state.hasStone ? 'vacant' : 'occupied' )
                + " "
                + ( this.state.color )
                + " "
                + createPositionClass(this.props.number)
            }
            
            onClick={this.addStone}>
            
            { this.state.hasStone && <Stone color={this.state.color} /> }
            
            <GridLine position={createPositionClass(this.props.number)} isGuide="" />
            
        </section>
    );
  }
}
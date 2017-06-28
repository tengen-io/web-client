
import React, { Component } from "react";
import { browserHistory } from 'react-router';


export default class Home extends Component {
    
    componentDidMount() {
        browserHistory.push('/');
    }
  
    render() {

    return (
        <section id="home">
            <div className="container grid-960">
            
                <h1>Title</h1>
                <h2>Second title</h2>
                <h4>Subtitle down here</h4>
                <p>This is the home page.</p>
                <button className="btn">Click me</button>
                <button className="btn btn-primary">Click me</button>
                
            </div>
        </section>
    ); // Home component
    
  }
}
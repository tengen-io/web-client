
import React, { Component } from "react";
import Header from "./header";

export default class App extends Component {
    
    render() {

        return (
            <section>
                <Header/>
                { this.props.children }
            </section>
        );

    }
}

import React, { Component } from "react";

import style from '../stylesheets/partials/header.scss';

export default class Header extends Component {
    
    render() {
        return(
                
                <nav className="section section-header go-stop-header">
                    <div className="container grid-960 pt-10 pb-10">
                    
                        <h4 className="no-margin pt-10 pb-10">
                            <span className="text-bold pr-10">GoStop</span>
                            <span className="text-lighter">Open source Go</span>
                        </h4>
                        
                    </div>
                </nav>
                
        )
    }
    
}


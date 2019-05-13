import React, { Component } from 'react';
import './footer.sass';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: (new Date()).getFullYear()
        }
    }
    render() {
        return (
            <div className="footer-area text-center bg-dark">
                <span> {this.state.date} Blockchain </span>
            </div>
        );
    }
}

export default Footer;
import React, { Component } from 'react';
import {Footer} from 'react-materialize';

class Footah extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <Footer id="bottomFooter" className="grey-text-lighten-4 right" copyrights="Copyright 2018 Team Pizzalovers"
            moreLinks={
                <a className="grey-text text-lighten-4 right" href="https://github.com/Waffaru/Blog-Frontend">Github</a>
            }
             className='example'>
            <h5 className="white-text">Pizza Blog</h5>
            <p className="grey-text text-lighten-4">A small platform for all your pizza loving needs.</p>
            </Footer>
        );
    }

}

export default Footah;
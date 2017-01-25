import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation/Navigation';

class App extends Component {

    render() {
        const { children, location } = this.props;

        return (
            <div>
                <Navigation
                    location={location}
                />
                {children}
            </div>
        );
    }
}

// Connect state data
function mapStateToProps(state) {
    return {
    };
}

// Connect actions
export default connect(mapStateToProps, {
})(App);

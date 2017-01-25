import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.renderNavItem = this.renderNavItem.bind(this);
    }

    renderNavItem(link, index) {

        const {location: {pathname}} = this.props;
        const className = 'navItem' +
            (pathname.indexOf(link.href) === 0 ? ' active' : '');

        return (
            <Link to={link.href} key={index} className={className}>{link.label}</Link>
        );
    }

    render() {

        const navItems = [{
            label: 'Charities',
            href: '#'
        }];

        return (
            <div className="navbar">
                <a href={'https://developer.justgiving.com'} className="brand" target="_blank">
                </a>
                <div className="nav">
                    {navItems.map(this.renderNavItem)}
                </div>
            </div>
        );

    }
}

// Connect state data
function mapStateToProps() {
    return {};
}

// Connect actions
export default connect(mapStateToProps, {
})(Navigation);

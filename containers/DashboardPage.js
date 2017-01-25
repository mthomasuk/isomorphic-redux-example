import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCharityInfo, getCharityDonationInfo} from '../actions';
import CharityItem from '../components/Charities/CharityItem';
import DonationItem from '../components/Donations/DonationItem';
import List from '../components/Generic/List';

class DashboardPage extends Component {

    componentWillMount() {
        // this.props.getCharityInfo(true);
        // this.props.getCharityDonationInfo(true);
    }

    renderDonation(donation, i) {
        return (
            <DonationItem key={i} donation={donation} />
        );
    }

    static needs = [
      getCharityInfo,
      getCharityDonationInfo
    ]

    render() {
        const {charity, donations, isFetching} = this.props;

        if (isFetching) {
            return (
                <div className='container'>
                    Fetching data...
                </div>
            );
        }

        return (
            <div className='container'>
                <CharityItem charity={charity} />
                <List className='donation-container' renderItem={this.renderDonation} items={donations} loadMore={this.fetchMore}/>
            </div>
        );
    }

}

// Connect state data
function mapStateToProps(state) {

    const id = (Object.keys(state.entities.charities)[0]) || 0;
    const charity = (state.entities.charities[id] || {});
    const donations = ((((state.entities.donations || {})[0]) || {}).donations || []);

    const isFetching = (Object.keys(charity).length === 0 && charity.constructor === Object) || donations.length === 0;

    return {
        charity,
        donations,
        isFetching
    };
}

// Connect actions
export default connect(mapStateToProps, {
    getCharityInfo,
    getCharityDonationInfo
})(DashboardPage);

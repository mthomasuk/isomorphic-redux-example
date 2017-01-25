import React, {Component} from 'react';
import moment from 'moment';

function parseCurrency(currencyCode) {
    return currencyCode === 'GBP' ? '£' :
           currencyCode === 'USD' ? '$' :
           currencyCode === 'EUR' ? '€' :
           currencyCode === 'JPY' ? '¥' :
           '';
}

export default class DonationItem extends Component {

    render() {
        const { donationDate, donorDisplayName, currencyCode, amount, message } = this.props.donation;
        return(
            <div className='item donationsItem'>
                <h3>{moment.utc(donationDate).format('dddd Do MMM YYYY')}</h3>
                <p>
                    {`${parseCurrency(currencyCode)}${amount}`} by <em>{donorDisplayName}</em>
                </p>
                <p>{message}</p>
            </div>
        );
    }

}

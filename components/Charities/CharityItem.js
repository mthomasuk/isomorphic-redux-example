import React, {Component} from 'react';

export default class CharityItem extends Component {

    render() {
        const {name, profilePageUrl, logoAbsoluteUrl, description, websiteUrl} = this.props.charity;
        return (
            <div className='item'>
                <h2>
                    <a title={name} href={profilePageUrl} target="_blank">{name}</a>
                </h2>
                <a title={`${name} Logo`} href={websiteUrl} target="_blank">
                    <img src={logoAbsoluteUrl}/>
                </a>
                <p>{description}</p>
                <a title={`${name} Just Giving Page`} href={profilePageUrl} target="_blank">
                    {`${name} Just Giving Page`}
                </a>
            </div>
        );
    }

}

import React, {Component} from 'react';

export default class List extends Component {
    renderLoadMore() {
        const {isFetching} = this.props;
        return (
            <div>
                {isFetching
                    ? 'Loading...'
                    : 'Load More'}
            </div>
        );
    }

    render() {
        const {
            items,
            renderItem,
            className
        } = this.props;

        const isEmpty = items.length === 0;

        if (isEmpty) {
            return (
                <div>
                    No results
                </div>
            );
        }

        return (
            <div className={className}>
                {items.map(renderItem)}
            </div>
        );
    }
}

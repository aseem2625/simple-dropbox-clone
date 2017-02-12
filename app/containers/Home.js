import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { filterTable } from '../reducers/filter';
import ProductTable from '../components/ProductTable';
import { filterableTable } from '../styles/filterableTable.scss';


@connect(
    state => ({
        filter: state.filter
    }),
    dispatch => bindActionCreators({onFilter: filterTable}, dispatch)
)

export default class FilterableTable extends Component {
    static propTypes = {
        filter: PropTypes.string,
        onFilter: PropTypes.func,
        params: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let input;
        console.log(this.props.params.splat);

        return (
            <div className={filterableTable}>
                <input
                    value={this.props.filter}
                    ref={node => {input = node;}}
                    onChange={() => this.props.onFilter(input.value)} />

                <ProductTable filter={this.props.filter} />
            </div>
        );
    }

}

import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { filterTable } from '../reducers/modules/dashboard';
import ProductTable from '../components/ProductTable';
import { filterableTable } from '../styles/filterableTable.scss';


@connect(
    state => ({
        filter: state.dashboard.filter
    }),
    dispatch => bindActionCreators({onFilter: filterTable}, dispatch)
)

export default class Dashboard extends Component {
    static propTypes = {
        filter: PropTypes.string,
        onFilter: PropTypes.func,
        params: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log(e.target.value);
        this.props.onFilter(e.target.value);
    }

    render() {
        let input;
        console.log(this.props.params.splat);

        // const splitPath = this.props.params.splat.split('/');
        // console.log(splitPath);

        return (
            <div className={filterableTable}>
                <input onChange={this.handleChange} />
                <ProductTable filter={this.props.filter} />
            </div>
        );
    }
}

import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import Link from 'react-router/lib/Link';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { filterTable, getItemsByUrl } from '../reducers/modules/dashboard';
import FileItemRow from '../components/FileRowItem/FileItemRow';
import styles from '../styles/Dashboard.scss';


@connect(
    state => ({
        filter: state.dashboard.filter,
        result: state.dashboard.result
    }),
    dispatch => bindActionCreators({onFilter: filterTable, getItemsByUrl, pushState: push}, dispatch)
)

export default class Dashboard extends Component {
    static propTypes = {
        filter: PropTypes.string,
        onFilter: PropTypes.func,
        getItemsByUrl: PropTypes.func,

        result: PropTypes.object,
        currentDirectory: PropTypes.array, // will be replaced by result object


        pushState: PropTypes.func.isRequired,
        location: PropTypes.object,
        params: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);

        this.state = {selectedItems: {}};
        this.selectItem = this.selectItem.bind(this);
        this.createBreadCrumbs = this.createBreadCrumbs.bind(this);
    }

    componentDidMount() {
        // Dispatch a call on the basis of URL..
        let url = '/';
        const splats = this.props.params.splat;
        if (splats) {
            url = splats;
            console.log('SPLATS...', url);
        } else {
            url = this.props.location.pathname.slice(1).split('/');
            console.log('LOCATION...', url);
        }
        this.props.getItemsByUrl(url);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.result);
        if(!nextProps.result.success) {
            // If there is mismatch in reques then redirect
            console.log(nextProps.result.reason);
            this.props.pushState('/');
        }
    }

    selectItem(itemId) {
        const newSelectedItems = Object.assign({}, this.state.selectedItems);
        if (newSelectedItems.hasOwnProperty(itemId)) {
            delete newSelectedItems[itemId];
        } else {
            newSelectedItems[itemId] = true;
        }
        this.setState({selectedItems: newSelectedItems});
    }

    /* makes a dummy item of type:folder */
    handleAddNew() {
        // dispatch api call
        // add in frontend on success response
    }

    /* delete selected items */
    handleDelete() {
        // dispatch api call
        // remove from frontend on success response
    }

    createBreadCrumbs() {
        const breadCrumbs = [];
        if (!this.props.result || !this.props.result.path) {
            return (
                <Link className={styles.directoryBreadCrumbsItem}>Home</Link>
            );
        }

        // item are the ancestors in sequence
        this.props.result.path.forEach((item, ind)=>{
            breadCrumbs.push(
                <Link key={ind} className={styles.directoryBreadCrumbsItem}>{item.name}</Link>
            );
        });

        return breadCrumbs;
    }

    render() {
        // console.log(this.props);
        let currentUrl = this.props.location.pathname;
        // console.log('CURRENT URL...', currentUrl);

        const breadCrumbs = this.createBreadCrumbs();

        // console.log(splitPath);

        // currentDirectory per item id can be stored using indexDB through store so that network calls are not made again.

        return (
            <div className={styles.dashboardContainer}>
                <div className={styles.directoryHeader}>
                    <div className={styles.directoryBreadCrumbs}>
                        {breadCrumbs}
                    </div>
                    <div className={styles.dashboardControls}>
                        <span className={`glyphicon glyphicon-plus-sign ${styles.dashboardControlsBtn} ${styles.dashboardControlsBtnTypeA}`}
                              onClick={this.handleAddNew}
                              title="New folder"/>
                        <span className={`glyphicon glyphicon-trash ${styles.dashboardControlsBtn} ${styles.dashboardControlsBtnTypeB}`}
                              onClick={this.handleDelete}
                              title="Remove Selected Item"/>
                    </div>
                </div>
                <div className={styles.dashboardListContainer}>
                    <DashboardDirectory directory={this.props.currentDirectory}
                                        selectedItems={this.state.selectedItems}
                                        selectItem={this.selectItem}
                                        currentUrl={currentUrl} />
                </div>
                {/*
                <ProductTable filter={this.props.filter} />
                */}
            </div>
        );
    }
}

Dashboard.defaultProps = {
    currentDirectory: [
        {
            id: 13233,
            type: 'folder',
            name: 'my Folder',
        },
        {
            id: 4545,
            type: 'folder',
            name: 'PublicFolder',
        },
        {
            id: 23332,
            type: 'file',
            name: 'Random folder'
        }
    ]
};

const DashboardDirectory = (props) => {
    const directoryItems = [];

    if (!props.directory || !props.directory.length) {
        return (
            <div className={styles.dashboardListMsg}>
                <i className={`glyphicon glyphicon-cloud ${styles.icon}`}/>Start adding items on Cloud!
            </div>
        );
    }

    props.directory.forEach((item, ind)=>{
        directoryItems.push(
            <FileItemRow key={ind}
                         itemDetails={item}
                         isSelected={props.selectedItems[item.id]}
                         selectItem={props.selectItem}
                         currentUrl={props.currentUrl}/>
        );
    });


    const directoryList = (
      <ul className={styles.dashboardList}>
          {directoryItems}
      </ul>
    );

    return directoryList;
};

DashboardDirectory.propTypes = {
    directory: PropTypes.array,
    selectedItems: PropTypes.object,
    selectItem: PropTypes.func.isRequired,
    currentUrl: PropTypes.string
};

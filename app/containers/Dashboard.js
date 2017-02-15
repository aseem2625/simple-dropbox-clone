import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import Link from 'react-router/lib/Link';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { filterTable, getItemsByUrl, deleteItemsById, addNewItem } from '../reducers/modules/dashboard';
import FileItemRow from '../components/FileRowItem/FileItemRow';
import styles from '../styles/Dashboard.scss';


@connect(
    state => ({
        filter: state.dashboard.filter,
        result: state.dashboard.result,
        success: state.dashboard.success
    }),
    dispatch => bindActionCreators({onFilter: filterTable, getItemsByUrl, deleteItemsById, addNewItem, pushState: push}, dispatch)
)

export default class Dashboard extends Component {
    static propTypes = {
        filter: PropTypes.string,
        onFilter: PropTypes.func,
        getItemsByUrl: PropTypes.func,
        deleteItemsById: PropTypes.func,
        addNewItem: PropTypes.func,

        result: PropTypes.object,
        success: PropTypes.bool,


        pushState: PropTypes.func.isRequired,
        location: PropTypes.object,
        params: PropTypes.object
    }

    static defaultProps = {
        result: {
            itemDetails: {
                id: 0,
                children:[
                    {
                        id: 2323,
                        name: "myFolder",
                        type: "folder"
                    },
                    {
                        id: 1923,
                        name: "Documents",
                        type: "folder"
                    }
                ]
            },
            path: []
        },
        success: true
    }

    constructor(props, context) {
        super(props, context);

        this.state = {selectedItems: {}};
        this.fetchDataForPath = this.fetchDataForPath.bind(this);

        this.selectItem = this.selectItem.bind(this);
        this.createBreadCrumbs = this.createBreadCrumbs.bind(this);
        this.handleAddNewItem = this.handleAddNewItem.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    fetchDataForPath() {
        let url = '/';
        if (this.props.params.splat) {
            url = this.props.params.splat.split('/');
            // console.log('PARAMS...', url);
            // console.log(url);
        } else {
            url = this.props.location.pathname.slice(1).split('/');
            console.log('LOCATION...', url);
        }
        if (url[url.length -1] === "") {
            url.pop();
        }
        this.props.getItemsByUrl(url);
    }

    componentDidMount() {
        // console.log(".......CHECK.......");
        this.fetchDataForPath();
        // Dispatch a call on the basis of URL..
    }
    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.fetchDataForPath();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.success) {
            // If there is mismatch in reques then redirect
            // console.log(this.props.pushState);
            this.props.pushState('/');
            // window.location = '/';
        } else {
            // console.log(nextProps.result.itemDetails);
            // console.log(nextProps.result);
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
    handleAddNewItem() {
        // dispatch api call
        // add in frontend on success response
        console.log('Adding new folder');
        this.props.addNewItem(this.props.result.itemDetails.id, 'New Folder');
    }

    /* delete selected items */
    handleDelete() {
        // dispatch api call
        // remove from frontend on success response
        console.log('Deleting selected folder', this.state.selectedItems);
        if (!Object.keys(this.state.selectedItems).length) {
            return;
        }
        this.props.deleteItemsById(Object.keys(this.state.selectedItems));
        this.setState({selectedItems: {}}); // Ideally it should be done in .then() part of dispatch if it's a promise

    }

    createBreadCrumbs() {
        const breadCrumbs = [];
        breadCrumbs.push(
            <Link key="home" className={styles.directoryBreadCrumbsItem}>Home</Link>
        );

        if (this.props.result && this.props.result.path) {
            // item are the ancestors in sequence
            this.props.result.path.forEach((item, ind)=>{
                breadCrumbs.push(
                    <Link to="/" key={ind} className={styles.directoryBreadCrumbsItem}>{item.name}</Link>
                );
            });
            breadCrumbs.push(
                <Link key="currentPath" className={styles.directoryBreadCrumbsItem}>{this.props.result.itemDetails.name}</Link>
            );
        }

        return breadCrumbs;
    }

    render() {
        // console.log(this.props);
        let currentUrl = this.props.location.pathname;
        // console.log('CURRENT URL...', currentUrl);

        const breadCrumbs = this.createBreadCrumbs();

        // console.log(splitPath);
        // console.log("RESULT IN RENDER..", this.props.result);

        // currentDirectory per item id can be stored using indexDB through store so that network calls are not made again.

        return (
            <div className={styles.dashboardContainer}>
                <div className={styles.directoryHeader}>
                    <div className={styles.directoryBreadCrumbs}>
                        {breadCrumbs}
                    </div>
                    <div className={styles.dashboardControls}>
                        <span className={`glyphicon glyphicon-plus-sign ${styles.dashboardControlsBtn} ${styles.dashboardControlsBtnTypeA}`}
                              onClick={this.handleAddNewItem}
                              title="New folder"/>
                        <span className={`glyphicon glyphicon-trash ${styles.dashboardControlsBtn} ${styles.dashboardControlsBtnTypeB}`}
                              onClick={this.handleDelete}
                              title="Remove Selected Item"/>
                    </div>
                </div>
                <div className={styles.dashboardListContainer}>
                    <DashboardDirectory directory={this.props.result ? this.props.result.itemDetails : null}
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

const DashboardDirectory = (props) => {
    const directoryItems = [];

    if (!props.directory || !props.directory.children || !props.directory.children.length || !Object.keys(props.directory.children).length) {
        return (
            <div className={styles.dashboardListMsg}>
                <i className={`glyphicon glyphicon-cloud ${styles.icon}`}/>Empty folder. Add something!
            </div>
        );
    }

    props.directory.children.forEach((item, ind)=>{
        directoryItems.push(
            <FileItemRow key={ind}
                         itemDetails={item}
                         isSelected={props.selectedItems[item.id]}
                         selectItem={props.selectItem}
                         currentUrl={props.currentUrl} />
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
    directory: PropTypes.object,
    selectedItems: PropTypes.object,
    selectItem: PropTypes.func.isRequired,
    currentUrl: PropTypes.string
};

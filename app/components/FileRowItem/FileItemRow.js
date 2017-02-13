import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


export default class FileItemRow extends Component {
    static propTypes = {
        itemDetails: PropTypes.object,
        isSelected: PropTypes.bool,
        selectItem: PropTypes.func.isRequired,
        currentUrl: PropTypes.string.isRequired
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const styles = require('./FileItemRow.scss');

        const itemContainerClass = this.props.isSelected ? styles.fileItemContainer + ' ' + styles.selected : styles.fileItemContainer;
        // console.log(this.props);

        return (
            <li className={itemContainerClass}
                onClick={()=> this.props.selectItem(this.props.itemDetails.id)}>
                <div className={styles.fileItem}>
                    {
                        this.props.itemDetails.type === 'folder' ?
                            <i className={`glyphicon glyphicon-folder-close ${styles.itemIcon}`}/> :
                            <i className={`glyphicon glyphicon-file ${styles.itemIcon}`}/>
                    }
                    <Link to={`${this.props.currentUrl}/${this.props.itemDetails.name}`} onClick={(e)=>e.stopPropagation()}>
                        <span className={styles.itemLabel}>{this.props.itemDetails.name}</span>
                    </Link>
                </div>
                <div className={styles.fileItem}></div>
            </li>
        );
    }
}

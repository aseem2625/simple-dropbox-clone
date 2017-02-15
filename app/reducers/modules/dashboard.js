import localDB from './localDb';

// ACTIONS
const FILTER = 'FILTER';
const FETCH_ITEM = 'FETCH_ITEM';
const USER_ACTION = 'USER_ACTION';


// REDUCER
const initialState = {
};

const dashboard = (state = initialState, action) => {
    switch (action.type) {
        case FILTER:
            return {
                ...state,
                filter: action.filter
            };

        case FETCH_ITEM:
            return {
                ...state,
                result: action.result.success ? action.result.data : null,
                success: action.result.success
            };

        case USER_ACTION:
            return {
                ...state,
                result: action.result.success ? action.result.data : null,
                success: action.result.success
            };

        default:
            return state;
    }
};

// DISPATCHERS
export function filterTable(filterVal) {
    return {
        type: FILTER,
        filter: filterVal
    };
}

export function getItemsByUrl(url) {
    // add middleware later to support mapping with promise and actions
    const result = localDB.getItemByUrl(url);
    console.log('............RESULT FETCH.............');
    console.log(result);

    return {
        type: FETCH_ITEM,
        result
    };
}

export function deleteItemsById(items) {
    // add middleware later to support mapping with promise and actions
    const result = localDB.deleteItemsById(items);
    console.log('............RESULT DELETE.............');
    console.log(result);

    return {
        type: USER_ACTION,
        result
    };
}

export function addNewItem(parentId, itemName) {
    // add middleware later to support mapping with promise and actions
    const result = localDB.addNewItem(parentId, itemName);
    console.log('............RESULT ADD.............');
    console.log(result);

    return {
        type: USER_ACTION,
        result
    };
}

export function renameItem(parentId, itemName) {
    // add middleware later to support mapping with promise and actions
    const result = localDB.renameFileById(parentId, itemName);
    console.log('............RESULT RENAME.............');
    console.log(result);

    return {
        type: USER_ACTION,
        result
    };
}

export default dashboard;

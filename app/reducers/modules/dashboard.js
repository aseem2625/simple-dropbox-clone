import localDB from './localDb';

// ACTIONS
const FILTER = 'FILTER';
const FETCH_ITEM = 'FETCH_ITEM';
const DELETE_ITEMS = 'DELETE_ITEMS';


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

        case DELETE_ITEMS:
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
        type: DELETE_ITEMS,
        result
    };
}

export default dashboard;

// ACTIONS
const FILTER = 'FILTER';


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

export default dashboard;

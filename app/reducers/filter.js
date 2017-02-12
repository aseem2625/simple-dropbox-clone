// ACTIONS
const FILTER = 'FILTER';

// REDUCER
const filter = (state = '', action) => {
    switch (action.type) {
        case FILTER:
            return action.filter;
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

export default filter;

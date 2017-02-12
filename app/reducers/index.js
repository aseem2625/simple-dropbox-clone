import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import filter from './filter';


const rootReducer = combineReducers({
    filter,
    routing
});

export default rootReducer;

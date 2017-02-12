import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import dashboard from './modules/dashboard';


const rootReducer = combineReducers({
    routing,
    dashboard
});

export default rootReducer;

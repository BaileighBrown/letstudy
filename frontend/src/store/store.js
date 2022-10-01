import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';
import alertreducer from './reducers/alertReducer';


const rootReducer = combineReducers({
    auth:authReducer,
    alert:alertreducer,
});

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
    );

    export default store;
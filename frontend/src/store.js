import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	appReducer,
	userReducer,
	operationsReducer,
	accountsReducer,
	categoriesReducer,
} from './reducers';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	operations: operationsReducer,
	accounts: accountsReducer,
	categories: categoriesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

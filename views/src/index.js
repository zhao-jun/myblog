import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import { browserHistory,hashHistory , Router, Route, IndexRoute } from 'react-router';

import Index from './containers/Index/Index';
import Home from './components/Home/Home';
import Page from './containers/Page/Page';
import Publish from './containers/Publish/Publish';
import rootReducer from './reducers/index';

import './styles/common.scss';



const thunkMiddleware = store => next => action =>
    typeof action === 'function' ?
        action(store.dispatch, store.getState) :
        next(action);
const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result
};
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware,logger)
);

ReactDOM.render(
    <Provider store = {store}>
        <Router history = {browserHistory}>
            <Route path="/" component = {Index}>
                <IndexRoute component = {Home} />
                <Route path="/page" component = {Page} />
                <Route path="/publish" component = {Publish} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
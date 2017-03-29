import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import { browserHistory,hashHistory , Router, Route, IndexRoute } from 'react-router';

import Index from './containers/Index/Index';
import Home from './components/Home/Home';
import Blog from './containers/Blog/Blog';
import BlogArticle from './containers/BlogArticle/BlogArticle';
import BlogEdit from './containers/BlogEdit/BlogEdit';
import Page from './containers/Page/Page';
import Article from './containers/Article/Article';
import Edit from './containers/Edit/Edit';
import Publish from './containers/Publish/Publish';
import Create from './containers/Create/Create'
import Page404 from './components/Page404/Page404';

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
                <Route path="/blog" component = {Blog} />
                <Route path="/blog/:id" component = {BlogArticle} />
                <Route path="/blog/:id/edit" component = {BlogEdit} />
                <Route path="/page" component = {Page} />
                <Route path="/a/:id" component = {Article} />
                <Route path="/a/:id/edit" component = {Edit} />
                <Route path="/publish" component = {Publish} />
                <Route path="/publish/:id/edit" component = {Publish} />
                <Route path="/create" component = {Create} />
                <Route path="*" component = {Page404} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
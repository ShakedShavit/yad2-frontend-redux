import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PublishApartment from '../apartments/publish/PublishApartment';
import HomePage from '../home/HomePage';
import NotFoundPage from '../main/NotFoundPage';
import LoginRouter from './LoginRouter';

import { Provider } from 'react-redux';
import reducer from '../../reducers/reducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer
});

function AppRouter() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/realestate/forsale" />
                    </Route>
                    <Route path="/realestate" exact>
                        <Redirect to="/realestate/forsale" />
                    </Route>
                    <Route path="/realestate/forsale" component={HomePage} exact />
                    <LoginRouter path="/publish" component={PublishApartment} exact />
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </Provider>
        </BrowserRouter>
    );
}

export default AppRouter;
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const LoginRoute = ({ component: Component, ...rest }) => {
    const userDataState = useSelector(state => state.userDataState);

    return (
        <Route
            { ...rest }
            component={(props) => (
                !!userDataState.user ?
                <Component { ...props } /> :
                <Redirect to='/' />
            )}
        />
    );
};

export default LoginRoute;
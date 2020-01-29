import React from 'react'
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, isLogin, ...rest }) {
    return (
        <Route {...rest} render={props => (
            isLogin ?
                <Component {...props} />
                : <Redirect to="/logowanie" />
        )} />
    );
};

export default PrivateRoute
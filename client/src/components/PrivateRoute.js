import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <AuthContext.Consumer>
            {
                ({ isAuth }) => {
                    return (
                        <Route {...rest} render={props => (
                            isAuth ?
                                <Component {...props} />
                                : <Redirect to="/logowanie" />
                        )} />
                    )
                }
            }
        </AuthContext.Consumer>

    );
};

export default PrivateRoute
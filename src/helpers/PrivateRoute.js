import { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from '../Contexts/AuthContext';

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}

export default PrivateRoute;
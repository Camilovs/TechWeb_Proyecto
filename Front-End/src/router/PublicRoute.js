import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';


export const PublicRoute = ({
  isAuthenticated,
  redirect_to,
  component: Component,
  ...rest
}) => {
  console.log(isAuthenticated,": PublicRoute")
  return (
    <Route { ...rest }
      component={ (props) => {
        
        return(
          ( isAuthenticated )
            ? ( <Redirect to={redirect_to} /> )
            : ( <Component { ...props } /> )
        )
      }
        
      }
    />
  )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

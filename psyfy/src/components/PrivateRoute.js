import React , {Component} from 'react'
import { Route, Redirect } from 'react-router-dom'


function PrivateRoute(props){
  return(
      <Route exact path={props.path}>
          {
            props.is_authorized
            ? props.children
            : <Redirect to='/' />
          }
       </Route>
  )
}

export default PrivateRoute;

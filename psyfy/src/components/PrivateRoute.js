import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Utils from '../assets/js/Utils'
import Loading from './Loading'


class PrivateRoute extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuth: undefined
    }
  }

  componentDidMount = async () => {
    const isAuth = await Utils.isAuth()
    this.setState({ isAuth })
  }

  render() {
    return (
      typeof this.state.isAuth === 'undefined' ?
        <Loading />
        :
        <Route exact path={this.props.path}>
          {
            this.state.isAuth
              ? this.props.children
              : <Redirect to='/' />
          }
        </Route>
    )
  }
}

export default PrivateRoute;

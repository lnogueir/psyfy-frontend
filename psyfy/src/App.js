import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Utils from './assets/js/Utils'
import PageTemplate from './components/PageTemplate'
import PrivateRoute from './components/PrivateRoute'
import OverviewPage from './components/Overview/OverviewPage'
import HomePage from './components/Home/HomePage'
import RequestAccountPage from './components/RequestAccount/RequestAccountPage'
import CalendarPage from './components/Calendar/CalendarPage'
import ManageCredentialsPage from './components/ManageCredentials/ManageCredentialsPage'
import './assets/common_style.css'
import ResetPasswordPage from './components/ResetPasswordPage'
import Loading from './components/Loading'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthorized: undefined
    }
  }

  componentDidMount = async () => {
    let is_authorized = await Utils.isAuth()
    this.setState({ isAuthorized: is_authorized })
  }

  render() {
    const isAuthorized = this.state.isAuthorized
    return (
      <Router>
        <PageTemplate>
          {typeof isAuthorized === 'undefined' ? <Loading /> :
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route
                exact
                path="/request_account"
                render={props => <RequestAccountPage history={props.history} />}
              />
              <PrivateRoute path={"/overview"} is_authorized={isAuthorized}>
                <OverviewPage />
              </PrivateRoute>
              <PrivateRoute path={"/manage_credentials"} is_authorized={isAuthorized}>
                <ManageCredentialsPage />
              </PrivateRoute>
              <PrivateRoute path="/calendar" is_authorized={isAuthorized}>
                <CalendarPage />
              </PrivateRoute>
              <Route
                path={"/reset_password/:token"}
                render={props => <ResetPasswordPage {...props} />}
              />
            </Switch>
          }
        </PageTemplate>
      </Router>
    )
  }
}

export default App;

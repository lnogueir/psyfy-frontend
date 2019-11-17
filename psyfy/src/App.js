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



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page_title: null,
      is_authorized: (
        (window.localStorage.getItem('loggedUser') !== null)
        ||
        (window.sessionStorage.getItem('loggedUser') !== null)
      )
    }
  }


  render() {
    return (
      <Router>
        <PageTemplate>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route
              exact
              path="/request_account"
              render={props => <RequestAccountPage history={props.history} />}
            />
            <PrivateRoute path={"/overview"} is_authorized={this.state.is_authorized}>
              <OverviewPage />
            </PrivateRoute>
            <PrivateRoute path={"/manage_credentials"} is_authorized={this.state.is_authorized}>
              <ManageCredentialsPage />
            </PrivateRoute>
            <PrivateRoute path="/calendar" is_authorized={this.state.is_authorized}>
              <CalendarPage />
            </PrivateRoute>
            <Route
              path={"/reset_password/:token"}
              render={props => <ResetPasswordPage {...props} />}
            />
          </Switch>
        </PageTemplate>
      </Router>
    )
  }
}

export default App;

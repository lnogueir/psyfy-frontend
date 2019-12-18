import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PageTemplate from './components/PageTemplate'
import PrivateRoute from './components/PrivateRoute'
import OverviewPage from './components/Overview/OverviewPage'
import HomePage from './components/Home/HomePage'
import CalendarPage from './components/Calendar/CalendarPage'
import ManageCredentialsPage from './components/ManageCredentials/ManageCredentialsPage'
import ResetPasswordPage from './components/ResetPasswordPage'
import NotFoundPage from './components/NotFoundPage'
import './assets/app.css'
import 'aos/dist/aos.css'



function App() {
  return (
    <Router>
      <PageTemplate>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <PrivateRoute path={"/overview"}>
            <OverviewPage />
          </PrivateRoute>
          <PrivateRoute path={"/manage_credentials"}>
            <ManageCredentialsPage />
          </PrivateRoute>
          <PrivateRoute path="/calendar">
            <CalendarPage />
          </PrivateRoute>
          <Route
            path={"/reset_password/:token"}
            render={props => <ResetPasswordPage {...props} />}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </PageTemplate>
    </Router>
  )
}

export default App;

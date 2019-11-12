import React, {Component} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Utils from './assets/js/Utils'
import PageTemplate from './common_components/PageTemplate'
import PrivateRoute from './common_components/PrivateRoute'
import OverviewPage from './pages/OverviewPage'
import HomePage from './pages/HomePage'
import RequestAccountPage from './pages/RequestAccountPage'
import CalendarPage from './pages/CalendarPage'
// import './assets/js/request_account'
import './assets/common_style.css'



class App extends Component{
  constructor(props){
    super(props)
    this.state= {
      page_title: null,
      is_authorized: (
        (window.localStorage.getItem('loggedUser') !== null)
        ||
        (window.sessionStorage.getItem('loggedUser') !== null)
      )
    }
  }



  render(){
    return (
      <Router>
          <PageTemplate>
              <Switch>
                  <Route exact path="/">
                      <HomePage/>
                  </Route>
                  <Route
                    exact
                    path="/request_account"
                    render={props=><RequestAccountPage history={props.history} />}
                  />
                  <PrivateRoute path={"/overview"} is_authorized={this.state.is_authorized}>
                      <OverviewPage/>
                  </PrivateRoute>
                  <PrivateRoute path="/calendar" is_authorized={this.state.is_authorized}>
                      <CalendarPage />
                  </PrivateRoute>
              </Switch>
          </PageTemplate>
      </Router>
    )
  }
}

export default App;

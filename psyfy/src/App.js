import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Utils from './assets/js/Utils'
import PageTemplate from './common_components/PageTemplate'
import OverviewPage from './pages/OverviewPage'
import HomePage from './pages/HomePage'
import CalendarPage from './pages/CalendarPage'
import './assets/common_style.css'


class App extends React.Component{
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

  updatePageTitle = (new_title) =>{
    this.setState({page_title: new_title})
  }


  render(){
    return (
      <Router>
        <PageTemplate page_title={this.state.page_title}>
            {
              this.state.is_authorized
              &&
              <Switch>
                <Route
                  path="/overview"
                  exact
                  render={props => <OverviewPage {...props} updatePageTitle={this.updatePageTitle}/>}
                />
                <Route
                  path="/calendar"
                  render={props => <CalendarPage {...props} updatePageTitle={this.updatePageTitle} />}
                />
              </Switch>
            }
            <Route path="/" exact render={props=> <HomePage{...props} updatePageTitle={this.updatePageTitle}/>}/>
        </PageTemplate>
      </Router>
    )
  }
}

export default App;

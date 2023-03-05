import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux';


// assets
// import logo from './logo.svg'
import './assets/scss/global.scss'

// cmps
import { AppHeader } from './cmps/AppHeader'
import { Home } from './views/Home'
import { ContactList } from './views/ContactList'
import { ContactDetails } from './views/ContactDetails'
import { AppFooter } from './cmps/AppFooter'
import { Charts } from './views/Charts'
import { ContactEdit } from './views/ContactEdit'
import { SignupPage } from './views/SignupPage'

import { userService } from './services/user.service'


function PrivateRoute(props) {

  const user = userService.getLoggedInUser()

  return user ? <Route {...props} /> : <Redirect to='/signup' />
}

function App() {

  return (
    <Router>
      <section className="main-app">
        <AppHeader />

        <main className="main container flex auto-center">
          <Switch>
            <Route path="/contact/edit/:id?" component={ContactEdit} />
            <Route path="/contact/:id" component={ContactDetails} />
            <Route path='/signup' component={SignupPage} />
            <Route path="/contact" component={ContactList} />
            <PrivateRoute path="/chart" component={Charts} />
            <PrivateRoute path="" component={Home} />
          </Switch>

        </main>

        <AppFooter />
      </section>
    </Router>
  )

}
export default App

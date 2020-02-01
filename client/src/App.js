
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from "./pages/NotFound";
import PrivateRoute from './components/PrivateRoute'
import Course from './pages/Course'
import MP4Player from './pages/MP4Player'
import MyVideoCourses from './pages/MyVideoCourses'
import Profile from './pages/Profile'
import ShoppingCard from './pages/ShoppingCard'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { blue, red } from '@material-ui/core/colors'
import {AuthContext} from './components/AuthContext'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  }
})


class App extends React.Component {

  state = {
    isAuth: false
  }

  login = () => {
    this.setState({
      isAuth: true
    })
  }

  logout = () => {
    this.setState({
      isAuth: false
    })
  }

  render() {
    return (
      <AuthContext.Provider value={{ isAuth: this.state.isAuth, login: this.login, logout: this.logout }}>
        <ThemeProvider theme={theme}>
          <Router>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/logowanie" component={Login} />
              <Route exact path="/rejestracja" component={Register} />
              <PrivateRoute exact path="/kurs/video/:name" component={MP4Player} />
              <PrivateRoute exact path="/kurs/:name" component={Course} />
              <PrivateRoute exact path="/moje-kursy" component={MyVideoCourses} />
              <PrivateRoute exact path="/profil" component={Profile} />
              <PrivateRoute exact path="/koszyk" component={ShoppingCard} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </ThemeProvider>
      </AuthContext.Provider>
    );
  }

}

export default App
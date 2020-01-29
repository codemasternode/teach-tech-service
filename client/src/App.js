
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

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  }
})


class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/logowanie" component={Login} />
            <Route path="/rejestracja" component={Register} />
            <PrivateRoute path="/kurs/video/:name" component={MP4Player} />
            <PrivateRoute exact path="/kurs/:name" component={Course} />
            <PrivateRoute path="/moje-kursy" component={MyVideoCourses} />
            <PrivateRoute path="/profil" component={Profile} />
            <PrivateRoute path="/koszyk" component={ShoppingCard} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>

    );
  }

}

export default App
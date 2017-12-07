import React from 'react';
import { withRouter, Route } from "react-router-dom";
import MapContainer from './components/map'
import Signup from './components/signup'
import Login from './components/login'
import Loginbar from './components/loginNavbar'
import Navbar from './components/navbar'

const url =  "http://localhost:3001/api/v1/";


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      user: {},
      login: false
    }
    this.handleLogin = this.handleLogin.bind(this)

  }

  // user.addresses.directions/name is type

  handleLogin = (userData) => {
    localStorage.setItem('token', userData.jwt)
    this.setState({user: userData, login: true}, this.goToMap)
  }

  goToMap = () => {
    this.props.history.push("/map")
  }

      logout = () => {
         localStorage.removeItem("token");
         this.setState({ currentUser: {} });
         this.props.history.push("/login");
       };

       signup = () => {
         this.props.history.push("/signup");
       };

       backToLogin = () => {
         this.props.history.push("/login");
       };

       componentWillMount() {
       }

       componentDidMount = () => {

         const token = localStorage.getItem("token");
         if (token) {
           fetch(`${url}current_user`, {
             headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
               Authorization: `Token ${token}`
             }
           })
           .then(res => res.json())
           .then(json => this.setState( () => {
             return { user: json, login:true }

           }));
         } else {
           if (!window.location.href.includes("signup")) {
             this.props.history.push("/login");
           }
         }
       }


  render() {
    return (
      <div>
      {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/signup" ? (
          <Navbar
            logout={this.logout}
            challengesLink={this.challengesLink}
            newChallengeLink={this.newChallengeLink}
          />
        ) : (
          <div>
          <Loginbar
            handleLogin = {this.handleLogin}
            location={this.props.location.pathname}
            signup={this.signup}
            backToLogin={this.backToLogin}
          />
          </div>
        )}

        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" render={() => <Login handleLogin = {this.handleLogin}/>}/>
        <Route exact path="/map" render={() => <MapContainer user = {this.state}/>}/>
        <loginNavBar />
      </div>
    );
  }
}

export default withRouter(App);

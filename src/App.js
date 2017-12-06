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
      users: [],
      currentUser: {},
      user: {},
      login: false
    }
  }

  handleLogin = (userData) => {
    localStorage.setItem('token', userData.jwt)
    debugger
    this.setState({user: {username: userData.username, id: userData.id}})
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
               "content-type": "application/json",
               accept: "application/json",
               Authorization: `Token ${localStorage.getItem('jwt')}`
             }
           })
           .then(res => res.json())
           .then(json => this.setState({ currentUser: json }));
         } else {
           if (!window.location.href.includes("signup")) {
             this.props.history.push("/login");
           }
         }
        //  fetch(`${url}users`)
        //    .then(res => res.json())
        //    .then(json =>
        //      this.setState({
        //        users: json
        //      })
        //    );
       }

       componentDidMount = ( )=> {
         fetch(`${url}users`)
           .then(res => res.json())
           .then(json =>
             this.setState({
               users: json
             }, this.catchThis)
           );
       }

       catchThis = () =>{

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

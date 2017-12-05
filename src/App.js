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
      currentUser: {}
    }
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
       }

       componentDidMount() {
         fetch(`${url}users`)
           .then(res => res.json())
           .then(json =>
             this.setState({
               users: json
             })
           );
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
          <Loginbar
            location={this.props.location.pathname}
            signup={this.signup}
            backToLogin={this.backToLogin}
          />
        )}

        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <loginNavBar />
      <MapContainer/>
      </div>
    );
  }
}

export default withRouter(App);

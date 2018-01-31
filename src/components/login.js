import React from "react";

import { Form, Grid, Image } from "semantic-ui-react";
const url = "https://mymidpointserver.herokuapp.com/api/v1/";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
  }


  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  static currentUser () {
    return fetch(`${url}/current_user`, {
      headers: {'content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': localStorage.getItem('jwt')}
    }).then(res => res.json())
  }




  handleLoginSubmit = (e) => {
    e.preventDefault();
    const body = this.state;
    fetch(`${url}auth`, {
      method: "POST",
      headers: {'content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Token ${localStorage.getItem('jwt')}`},
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          localStorage.setItem("token", json.jwt);
          debugger
          this.props.handleLogin(json)
        }
      }
    )
    ;
  };




  quickGet = (e) => {
    const body = this.state;

    fetch(`${url}current_user`, {
      headers: {'content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': localStorage.getItem('jwt')},
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => {

        if (!json.error) {
          localStorage.setItem("token", json.jwt);
        }
        else{

        }
      });
  };


  render() {
    return (



      <Grid celled textAlign = 'center'>



      <Grid.Row columns = {3}>
      <Grid.Column/>
      <Grid.Column>
        <Image
        centered
        src = 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-256.png' alt='marker'/>
        <h2>lets meet in the middle</h2>
        <Form onSubmit={this.handleLoginSubmit}>
          <Form.Group style = {{textAlign: 'centered'}} inline widths="12">
            <Form.Input

              name="username"
              onChange={this.handleChange}
              label="Username"
              placeholder="username"
            />
            <Form.Input
              name="password"
              onChange={this.handleChange}
              label="Password"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Button>Login</Form.Button>
        </Form>
        </Grid.Column>
        <Grid.Column/>
        </Grid.Row>

        <Grid.Row>

        </Grid.Row>
      </Grid>
    );
  }
}
export default Login;

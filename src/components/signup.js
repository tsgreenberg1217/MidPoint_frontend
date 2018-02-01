import React from "react";
import { Form, Grid, Image } from "semantic-ui-react";
const url = "https://mymidpointserver.herokuapp.com/api/v1/";

class Signup extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = this.state;
    fetch(`${url}users`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(res => res.json()).then(json => this.props.handleSignup(json))
    ;
  };

  render() {
    return (
      <Grid celled textAlign = 'center'>
      <Grid.Row  columns = {3}>
      <Grid.Column/>

      <Grid.Column>
      <Image
      centered
      src = 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-256.png' alt='marker'/>
        <h2>Signup</h2>
        <Form onSubmit={this.handleSubmit}>
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
              type='password'
              placeholder="Password"
            />
          </Form.Group>
          <Form.Button>Lets Go!</Form.Button>
        </Form>
        </Grid.Column>
        <Grid.Column/>
        </Grid.Row>

      </Grid>
    );
  }
}
export default Signup;

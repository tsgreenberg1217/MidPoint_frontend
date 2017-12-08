import React from "react";
import { Form } from "semantic-ui-react";
const url = "http://localhost:3001/api/v1/";

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
      <div>
        <h2>Signup</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="12">
            <Form.Input
              name="username"
              onChange={this.handleChange}
              label="Username"
              placeholder="username"
            />
          </Form.Group>
          <Form.Group widths="12">
            <Form.Input
              name="password"
              onChange={this.handleChange}
              label="Password"
              type='password'
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group widths="12">
            <Form.Input
              name="email"
              onChange={this.handleChange}
              label="Email"
              type="text"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>

      </div>
    );
  }
}
export default Signup;

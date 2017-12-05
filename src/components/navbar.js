import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

export default class MenuExampleBasic extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item
          position="right"
          name="Sign Out"
          active={activeItem === "Sign Out"}
          onClick={this.props.logout}
        >
          Sign Out
        </Menu.Item>
      </Menu>
    );
  }
}

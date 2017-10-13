import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';


class MenuItems extends Component {

  handleClick = (event) => {
    console.log('handleClick was clicked')
    this.props.changeSection(event.target.innerText)
  }

  buildMenu = () => {
    return this.props.h2s.map(h2 => {
      return (
        <Menu.Item
          key={h2}
          name={h2}
          onClick={this.handleClick}
          active={this.props.currentH2Name === h2}
        >
          {h2}
        </Menu.Item>
      )
    })
  }

  render() {
    return (
      <Menu
        borderless
        stackable
        attached
        widths={Math.max(6, Math.min(this.props.h2s.length, 16))}
      >
        {this.buildMenu()}
      </Menu>
    )
  }
}

export default MenuItems;

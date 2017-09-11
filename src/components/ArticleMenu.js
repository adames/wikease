import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';


class ArticleMenu extends Component {

  handleClick = (event) => {
    this.props.changeSection(event.target.innerText)
  }

  buildMenu = () => {
    return this.props.h2s.map(h2 => {
      return (
        <Menu.Item name={h2} key={h2} active={this.props.currentH2Name === h2} onClick={this.handleClick}>
          {h2}
        </Menu.Item>
      )
    })
  }

  render() {
    return (
      <div className='ArticleMenu' >
        {this.buildMenu()}
      </div>
    );
  }
}

export default ArticleMenu;

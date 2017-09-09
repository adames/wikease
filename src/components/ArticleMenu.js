import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';


class ArticleMenu extends Component {

  buildMenu = () => {
    return this.props.h2s.map(h2 => {
      return (
        <Menu.Item name={h2} key={h2}>
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

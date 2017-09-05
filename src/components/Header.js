import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <img
          src="https://imgs.xkcd.com/comics/the_problem_with_wikipedia.png"
          alt="xkcd"
          width="20%"
          height="20%" />
      </div>
    );
  }
}

export default Header;

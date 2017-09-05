import React, { Component } from 'react';
import Header from './Header'
import SearchBar from './SearchBar'
import Article from './Article'
import Related from './Related'

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Header />
        <SearchBar />
        <Article />
        <Related />
      </div>
    );
  }
}

export default Main;

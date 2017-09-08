import React, { Component } from 'react';
import Header from './Header'
import SearchBar from './SearchBar'
import Article from './Article'
import Related from './Related'

class Main extends Component {
  state = {
    title: 'Albert_Einstein',
  }

  changeTitle = (title) => this.setState({title})

  render() {
    return (
      <div className="Main">
        <Header />
        <SearchBar changeTitle={this.changeTitle} />
        <Article title={this.state.title}/>
      </div>
    );
  }
}

export default Main;

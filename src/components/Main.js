import React, { Component } from 'react';
import Article from './Article'
import SearchPage from './SearchPage'

class Main extends Component {
  state = {
    title: 'Albert Einstein',
  }

  changeTitle = (title) => this.setState({title})

  render() {
    return (
      <div className="Main">
        <SearchPage changeTitle={this.changeTitle} />
        <Article title={this.state.title} changeTitle={this.changeTitle}/>
      </div>
    );
  }
}

export default Main;

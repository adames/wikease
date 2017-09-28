import React, { Component } from 'react';
import ArticleContainer from './ArticleContainer'
import SearchPage from './SearchPage'

class Main extends Component {
  state = {
    title: 'Albert Einstein',
  }

  changeTitle = (title) => this.setState({title})

  render() {
    return (
      <div className="Main">
        <SearchPage
          changeTitle={this.changeTitle}
        />
        <ArticleContainer
          title={this.state.title}
          changeTitle={this.changeTitle}
        />
      </div>
    );
  }
}

export default Main;

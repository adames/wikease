import React, { Component } from 'react';
import { Search, Segment } from 'semantic-ui-react'


export default class SearchBar extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    this.props.changeTitle(result.title)
    window.location = "#ArticleContainer";
    return this.resetComponent()
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      fetch(`https://wikeasebackend.herokuapp.com/articles/search?searchterm=${value}`)
      .then(res => res.json())
      .then(response => this.setState({
          isLoading: false,
          results: response,
        })
      )
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Segment basic padded className='Search'>
          <Search
            fluid
            loading={isLoading}
            showNoResults={true}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
          />
      </Segment>
    )
  }
}

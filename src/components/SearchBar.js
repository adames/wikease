import React, { Component } from 'react';
import { Search } from 'semantic-ui-react'


export default class SearchBar extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      fetch(`http://localhost:8080/articles/search?searchterm=${value}`)
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
      <div className="Search">
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
          />
      </div>
    )
  }
}

import React, { Component } from 'react';
import SearchBar from './SearchBar'
import { Image, Segment } from 'semantic-ui-react'


export default class SearchPage extends Component {

  render() {

    return (
      <Segment attached='bottom' vertical>
        <div className="Logo">
          <Image src="Wikease.png" />
        </div>
        <div className="SearchBar">
          <SearchBar changeTitle={this.changeTitle}/>
        </div>
        <Image src="https://i.pinimg.com/originals/72/b0/43/72b04323ecf168b0e66d85c384b156fd.gif" shape='rounded' fluid/>
      </Segment>
    )
  }
}

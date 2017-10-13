import React, { Component } from 'react'
import StackGrid from "react-stack-grid";
import { Segment, Container, Card, Image } from 'semantic-ui-react'

class Related extends Component {
  state = {
    relatedObjects: [],
  }

  handleClick = (event) => {
    window.location = "#Article";
    this.props.changeTitle(event.currentTarget.children[1].children[0].innerText)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps['ps'] !== undefined) {
      let titles = nextProps['ps']['links'].join('|')
      fetch(`https://wikeasebackend.herokuapp.com/articles/related?titles=${titles}`)
      .then(res => res.json())
      .then(results =>
        this.setState({
          relatedObjects: results,
        })
      )
    }
  }

  buildCards(relatedObjects) {
    return relatedObjects.map(item => {
      return (
          <Card key={item.title} onClick={this.handleClick}>
            <Image src={item.image} />
            <Card.Content>
              <Card.Header>{item.title}</Card.Header>
              <Card.Description>{item.extract}</Card.Description>
            </Card.Content>
          </Card>
      )
    })
  }

  render () {
    return (
      <Container>
        {
          this.state.relatedObjects.length !== 0 &&
          <Segment basic padded>
            <h2 id="Related">Related Articles</h2>
          </Segment>
        }
        <StackGrid
          columnWidth={300}
          gutterWidth={30}
          gutterHeight={30}
          monitorImagesLoaded={true}
        >
          {this.buildCards(this.state.relatedObjects)}
        </StackGrid>
      </Container>
    )
  }
}

export default Related

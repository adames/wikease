import React from 'react'
import { Card, Segment, Image } from 'semantic-ui-react'

//TODO
//test to see if formats correctly

const Related = (props) => {
  state = {
    relatedObjects: []
  }
  componentWillReceiveProps(nextProps){
    fetch(`http://localhost:8080/articles?title=${nextProps.title}`)
    .then(res => res.json())
    .then(results =>
      this.setState({
        relatedObjects: results,
      })
    )
  }

  cards = (relatedObjects) => {
    return relatedObjects.map(item => {
      return (
        <Card>
          <Image src={item.image} />
          <Card.Content>
            <Card.Header>{item.title}</Card.Header>
            <Card.Description>{item.extract}</Card.Description>
          </Card.Content>
        </Card>
      )
    })
  }

  render (
    <Segment>
      <Card.Group>
        {cards(state.relatedObjects)}
      </Card.Group>
    </Segment>
  )
}

export default Related

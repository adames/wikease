import React, { Component } from 'react'
import {Carousel as CarouselAPI} from 'react-responsive-carousel'
import { Container } from 'semantic-ui-react'

class Carousel extends Component {

  build_carousel() {
    let section = this.props.section
    return Object.values(section)[0].map((slide, index) => {
      return (
        <div className="my-slide primary" key={index}>
          <h2>{Object.keys(section)[0]}</h2>
          <p>{slide['text']}</p>
        </div>
      )
    })
  }

  render() {
    return (
      <Container>
        <CarouselAPI
          showThumbs={false}
          showStatus={false}
          width="75%"
          useKeyboardArrows
          infiniteLoop={true}
          onChange={this.props.onChange}
          className="presentation-mode"
        >
          {this.build_carousel()}
        </CarouselAPI>
      </Container>
    );
  }
}

export default Carousel;

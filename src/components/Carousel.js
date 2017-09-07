import React, { Component } from 'react'
import {Carousel as CarouselAPI} from 'react-responsive-carousel'
import { Container } from 'semantic-ui-react'

class Carousel extends Component {

  build_carousel() {
    return this.props.ps.map((slide, index) => {
      return (
        <div className="presentation-mode my-slide" key={index}>
          <p className="legend">
            <br />
            {slide.text}
          </p>
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
          showArrows={true}
          width="100%"
          useKeyboardArrows
          infiniteLoop={true}
          onChange={this.props.onChange}
          className="presentation-mode" >
            {this.build_carousel()}
        </CarouselAPI>
      </Container>
    );
  }
}

export default Carousel;

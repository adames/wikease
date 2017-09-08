import React, { Component } from 'react'
import {Carousel as CarouselAPI} from 'react-responsive-carousel'

export default class Carousel extends Component {

  build_carousel = () => {
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
      <div className='Carousel'>
        <CarouselAPI
          selectedItem={this.props.currentP}
          showIndicators={false}
          showStatus={false}
          showArrows={false}
          width="100%"
          infiniteLoop={true}
          className="presentation-mode"
        >
          {this.build_carousel()}
        </CarouselAPI>
      </div>
    );
  }
}

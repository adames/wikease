import React, { Component } from 'react'
import {Carousel as CarouselAPI} from 'react-responsive-carousel'

export default class Carousel extends Component {

  build_carousel = () => {
    return this.props.ps.map((slide, index) => {
      return (
        <div className="presentation-mode my-slide" key={index}>
          <p className="legend">
            <br />
            {this.props.currentH3Name}
            <br /><br />
            {slide.text}
          </p>
        </div>
      )
    })
  }

  render() {
    const backgroundImageStyle = {
      backgroundImage: `url(${this.props.image})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    };

    return (
      <div className='Carousel' style={backgroundImageStyle}>
        <CarouselAPI
          selectedItem={this.props.currentP}
          showThumbs={false}
          emulateTouch={true}
          showIndicators={false}
          showStatus={false}
          showArrows={false}
          width="85%"
          infiniteLoop={true}
          className="presentation-mode"
        >
          {this.build_carousel()}
        </CarouselAPI>
      </div>
    );
  }
}

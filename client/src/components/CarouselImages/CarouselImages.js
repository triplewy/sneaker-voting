import React from 'react';
import { Carousel } from 'react-bootstrap'
import './CarouselImages.css'

export default class CarouselImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    var renderedImages = [];
    if (this.props.images) {
      var width = 0
      var height = 0;
      if (this.props.images.length === 1) {
        return (
          <div className="postImage" style={{backgroundImage: 'url(' + this.props.images[0].imageUrl + ')'}} />
        )
      } else {
        renderedImages = this.props.images.map((item, index) => {
          return (
            <Carousel.Item key={index}>
              <div className="postImage" style={{backgroundImage: 'url(' + item.imageUrl + ')'}} />
            </Carousel.Item>
          )
        })
        return (
          <Carousel
            interval={null}
          >
            {renderedImages}
          </Carousel>
        )
      }
    } else {
      return null
    }
  }
}

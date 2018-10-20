import React from 'react';
import './InstructionsModal.css';
import { Modal, Carousel } from 'react-bootstrap'

const url = process.env.REACT_APP_API_URL

export default class InstructionsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: true,
      activeIndex: 0
    };

    this.handleClose = this.handleClose.bind(this)
    this.next = this.next.bind(this)
    this.back = this.back.bind(this)
  }

  handleClose() {
    this.setState({showModal: false})
  }

  next() {
    this.setState({activeIndex: this.state.activeIndex + 1})
  }

  back() {
    this.setState({activeIndex: this.state.activeIndex - 1})
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.handleClose}>
        <Modal.Body>
          <Carousel
            interval={null}
            controls={false}
            activeIndex={this.state.activeIndex}
          >
            <Carousel.Item>
              <div className='instructionsSlide'>
                <div className='topDiv'/>
                <p className='instructionsSlideTitle'>Welcome</p>
                <div className='descriptionDiv'>
                  <p>A platform for finding the coolest sneaker concepts out there</p>
                </div>
                <div className='nextButton' onClick={this.next}>
                  <p>Next</p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className='instructionsSlide'>
                <div className='topDiv'>
                  <p style={{textAlign: 'left'}} onClick={this.back}>Back</p>
                </div>
                <p className='instructionsSlideTitle'>Vote on concepts</p>
                <div className='descriptionDiv'>
                  <p>Click on the vote button for concepts you like</p>
                </div>
                <div className='nextButton' onClick={this.next}>
                  <p>Next</p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className='instructionsSlide'>
                <div className='topDiv'>
                  <p style={{textAlign: 'left'}} onClick={this.back}>Back</p>
                </div>
                <p className='instructionsSlideTitle'>Submit your concepts</p>
                <div className='descriptionDiv'>
                  <p>Click on the upload button to submit</p>
                </div>
                <div className='nextButton' onClick={this.next}>
                  <p>Next</p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className='instructionsSlide'>
                <div className='topDiv'>
                  <p style={{textAlign: 'left'}} onClick={this.back}>Back</p>
                </div>
                <p className='instructionsSlideTitle'>Enjoy</p>
                <div className='descriptionDiv'>
                  <p>Create the next biggest sneaker</p>
                </div>
                <div className='nextButton' onClick={this.handleClose}>
                  <p>Done</p>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
      </Modal>
    )
  }
}

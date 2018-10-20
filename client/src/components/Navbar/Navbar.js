import React from 'react';
import './Navbar.css';
import Upload from '../Upload/Upload'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countdown: '',
      showCountdown: true
    };

  }

  componentDidMount() {
    var countDownDate = new Date("Dec 1, 2018 23:59:59").getTime();

    var x = setInterval(() => {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.setState({countdown: days + ":" + hours + ":" + minutes + ":" + seconds})
    }, 1000);

    var y = setInterval(() => {
      this.setState({showCountdown: !this.state.showCountdown})
    }, 8000);
  }

  render() {
    return (
      <div className='banner'>
        <div style={{width: '10%'}}>
          <p>Sneakers</p>
        </div>
        <div className='countdownDiv' style={{margin: '0 auto', textAlign: 'center'}}>
          <div style={{position: 'relative'}}>
            <div className='countdownDate' style={{opacity: this.state.showCountdown ? 0 : 1}}>
              <p>Voting period ends: December 1st, 2018</p>
            </div>
            <p>{this.state.countdown}</p>
          </div>
        </div>
        <Upload />
      </div>
    );
  }
}

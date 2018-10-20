import React from 'react';
import './SneakerItem.css';
import CarouselImages from '../CarouselImages/CarouselImages'
import { dateDiffInDays } from '../dateFormat'

const url = process.env.REACT_APP_API_URL

export default class SneakerItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      votes: this.props.votes,
      voted: false,
      showAlert: false
    };

    this.handleVote = this.handleVote.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.votes !== prevProps.votes) {
      this.setState({votes: this.props.votes})
    }
  }

  handleVote() {
    fetch(url + '/api/item/vote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        mediaId: this.props.mediaId
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'success') {
        this.setState({votes: this.state.votes + 1, voted: true, showAlert: true})
        setTimeout(function() {
          this.setState({showAlert: false})
        }.bind(this), 2500)
      }
    })
    .catch(function(err) {
        console.log(err);
    });
  }

  render() {
    return (
      <div className='sneakerItem'>
        <div className='imageWrapper'>
          <p className='votes'>{this.state.votes}</p>
          <div className="votedFeedback" style={{opacity: this.state.showAlert ? 1 : 0}}>
            <div>
              <p>Voted</p>
            </div>
          </div>
          <CarouselImages images={this.props.imageUrls} />
        </div>
        <div className='sneakerInfo'>
          <div>
            <div className='nameTitle'>
              <p style={{fontSize: '20px'}}>{this.props.name}</p>
              <p style={{fontSize: '14px', color: '#888888'}}>{this.props.title}</p>
            </div>
            <p style={{fontSize: '14px'}}>{dateDiffInDays(new Date(this.props.dateTime))}</p>
          </div>
          <div style={{marginLeft: 'auto'}}>
            <div className='voteButton' style={{cursor: this.state.voted ? 'default' : 'pointer'}}
              onClick={this.state.voted ? null : this.handleVote}>
              <p style={{margin: 'auto 0', color: this.state.voted ? "#ccc" : '#7DD48E'}}>{this.state.voted ? 'Voted' : 'Vote'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

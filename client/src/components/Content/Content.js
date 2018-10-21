import React from 'react';
import './Content.css';
import Sneakers from '../Sneakers/Sneakers'

const url = process.env.REACT_APP_API_URL

export default class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 0,
      items: [],
      hasMore: false
    };

    this.toggleTab = this.toggleTab.bind(this)
    this.fetchTop = this.fetchTop.bind(this)
    this.fetchNew = this.fetchNew.bind(this)
    this.fetchScroll = this.fetchScroll.bind(this)
  }

  componentDidMount() {
    this.fetchTop()
  }

  toggleTab(index) {
    this.setState({tab: index})
    if (index) {
      this.fetchNew()
    } else {
      this.fetchTop()
    }
  }

  fetchTop() {
    fetch(url + '/api/feed/top', {
      credentials: 'include'
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      var hasMore = true
      if (data.length < 20) {
        hasMore = false
      }
      this.setState({items: data, hasMore: hasMore})
    })
    .catch((error) => {
      console.error(error);
    });
  }

  fetchNew() {
    fetch(url + '/api/feed/new', {
      credentials: 'include'
    })
    .then((res) => res.json())
    .then((data) => {
      var hasMore = true
      if (data.length < 20) {
        hasMore = false
      }
      this.setState({items: data, hasMore: hasMore})
    })
    .catch((error) => {
      console.error(error);
    });
  }

  fetchScroll() {
    if (this.state.tab) {
      fetch(url + '/api/feed/new/' + this.state.items[this.state.items.length - 1].dateTime, {
        credentials: 'include'
      })
      .then((res) => res.json())
      .then((data) => {
        var hasMore = true
        if (data.length < 20) {
          hasMore = false
        }
        this.setState({items: this.state.items.concat(data), hasMore: hasMore})
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      fetch(url + '/api/feed/top/' + this.state.items[this.state.items.length - 1].votes, {
        credentials: 'include'
      })
      .then((res) => res.json())
      .then((data) => {
        var hasMore = true
        if (data.length < 20) {
          hasMore = false
        }
        this.setState({items: this.state.items.concat(data), hasMore: hasMore})
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  render() {
    return (
      <div style={{marginBottom: '10%'}}>
        <div className='tabSelector'>
          <div style={{boxShadow: this.state.tab ? '' : '0 2px 1px -1px #ccc'}} onClick={this.toggleTab.bind(this, 0)}>
            <p>Top</p>
          </div>
          <div style={{boxShadow: this.state.tab ? '0 2px 1px -1px #ccc' : ''}} onClick={this.toggleTab.bind(this, 1)}>
            <p>New</p>
          </div>
        </div>
        <Sneakers items={this.state.items} fetchScroll={this.fetchScroll} hasMore={this.state.hasMore}/>
      </div>
    );
  }
}

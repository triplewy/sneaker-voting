import React from 'react';
import './Content.css';
import Sneakers from '../Sneakers/Sneakers'

const url = process.env.REACT_APP_API_URL

export default class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 0,
      items: []
    };

    this.toggleTab = this.toggleTab.bind(this)
    this.fetchTop = this.fetchTop.bind(this)
    this.fetchNew = this.fetchNew.bind(this)
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
      this.setState({items: data})
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
      this.setState({items: data})
    })
    .catch((error) => {
      console.error(error);
    });
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
        <Sneakers items={this.state.items}/>
      </div>
    );
  }
}

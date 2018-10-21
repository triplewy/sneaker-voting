import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar'
import Content from './components/Content/Content'
import InstructionsModal from './components/InstructionsModal/InstructionsModal'
import { Modal } from 'react-bootstrap'

import logo from './logo.svg';
import './App.css';

const url = process.env.REACT_APP_API_URL

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visited: false
    }
  }

  componentDidMount() {
    let visited = localStorage['visited']
    if (visited) {
      this.setState({visited: true})
    } else {
      localStorage['visited'] = true;
      this.setState({visited: false});
    }
  }

  render() {
    if (!this.state.visited) {
      return (
        <div>
          <InstructionsModal />
          <Navbar/>
          <Content/>
        </div>
      )
    } else {
      return (
        <div>
          <InstructionsModal />
          <Navbar/>
          <Content/>
        </div>
      )
    }
  }
}

import React from 'react';
import './Sneakers.css';
import SneakerItem from '../SneakerItem/SneakerItem'

export default class Sneakers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.renderItems = this.renderItems.bind(this)
  }

  renderItems(items) {
    var renderedSneakers = [];
    if (items) {
      renderedSneakers = items.map((item, index) => {
        console.log(item);
        return (
          <SneakerItem key={item.mediaId} {...item} />
        )
      })
    }

    return renderedSneakers
  }

  render() {
    const renderedSneakers = this.renderItems(this.props.items)
    return (
      <div className='feed'>
        {renderedSneakers}
      </div>
    );
  }
}

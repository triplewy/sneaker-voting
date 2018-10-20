import React from 'react';
import Dropzone from 'react-dropzone'
import './UploadDropzone.css'

export default class UploadDropzone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropzoneActive: false
    };

    this.onDragEnter = this.onDragEnter.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  onDragEnter() {
    this.setState({dropzoneActive: true});
  }

  onDragLeave() {
    this.setState({dropzoneActive: false});
  }

  onDrop(accepted, rejected) {
    console.log("files dropped", accepted);
    if (accepted.length > 0) {
      if (accepted.length > 5) {
        this.setState({dropzoneActive: false})
        alert("You can only upload a maximum of 5 files");
      } else {
        this.setState({dropzoneActive: false});
        this.props.acceptImages(this, accepted)
      }
    } else {
      this.setState({dropzoneActive: false})
    }
  }

  render() {
    const dropzoneActive = this.state.dropzoneActive

    return (
      <div className="inputBox" style={{border: (dropzoneActive ? '1px solid #337ab7' : '1px solid #ccc')}}>
        <Dropzone
          disableClick
          accept={['image/jpg', 'image/png', 'image/jpeg']}
          style={{width: '100%', height: '100%'}}
          multiple={true}
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
        >
        <p className="inputBoxTitle" style={{color: (dropzoneActive ? '#337ab7' : "#888888")}}>Upload your concept</p>
        <div className="input_box_icons">
          {/* <div className={dropzoneActive ? "active" : ""} style={{backgroundImage: 'url(' + shorts + ')'}}></div>
          <div className={dropzoneActive ? "active" : ""} style={{backgroundImage: 'url(' + shirt + ')'}}></div>
          <div className={dropzoneActive ? "active" : ""} style={{backgroundImage: 'url(' + shoes + ')'}}></div> */}
        </div>
        <div className="inputBoxUpload">
          <p>Drag your files here or</p>
          <label htmlFor="inputImageButton" className="imageUploadLabel">
            browse
          </label>
        </div>
        <input id="inputImageButton" type="file" accept="image/*" onChange={this.props.acceptImages} multiple></input>
      </Dropzone>
    </div>
    )
  }
}

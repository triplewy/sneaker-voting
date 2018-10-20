import React from 'react';
import './Upload.css';
import UploadDropzone from './UploadDropzone'
import CarouselImages from '../CarouselImages/CarouselImages'
import deleteButton from '../../images/close-icon.png'
import * as loadImage from 'blueimp-load-image'
import validator from 'validator'
import { Modal } from 'react-bootstrap'

const url = process.env.REACT_APP_API_URL

export default class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      title: '',
      email: '',
      emailValid: false,

      files: [],
      progress: 0,

      showModal: false
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.acceptImages = this.acceptImages.bind(this)

    this.readImageFiles = this.readImageFiles.bind(this)
    this.previewImages = this.previewImages.bind(this)
    this.imageProcessor = this.imageProcessor.bind(this)

    this.upload = this.upload.bind(this)
    this.uploadHelper = this.uploadHelper.bind(this)

    this.delete = this.delete.bind(this)
  }

  handleChange(e) {
    const target = e.target;
    this.setState({[target.name]: target.value});
  }

  handleEmailChange(e) {
    const value = e.target.value
    const emailValid = validator.isEmail(value)
    this.setState({email: value, emailValid: emailValid})
  }

  handleShow() {
    this.setState({showModal: true})
  }

  handleClose() {
    this.setState({showModal: false})
  }

  acceptImages(e) {
    e.preventDefault()
    console.log(e.target.files);
    if (e.target.files.length + this.state.files.length > 5) {
      alert("You can only upload a maximum of 5 files");
    } else {
      this.previewImages(e.target.files)
    }
  }

  readImageFiles(e) {
    e.preventDefault();

  }

  async previewImages(files) {
    for (var i = 0; i < files.length; i ++) {
      await this.imageProcessor(files[i], this.state.files.length + i)
    }
  }

  imageProcessor(file, index) {

    const loadImageOptions = {
      canvas: true,
      maxWidth: 1080,
      maxHeight: 1440,
      minWidth: 150,
      minHeight: 200,
      downsamplingRatio: 0.6
    }
    loadImage.parseMetaData(file, (data) => {
      if (data.exif) {
        loadImageOptions.orientation = data.exif.get('Orientation')
      }
      loadImage(file, (canvas) => {
        file.imageUrl = canvas.toDataURL('jpg')
        var files = this.state.files
        files[index] = {file: file, imageUrl: file.imageUrl}
        this.setState({files: files})
      }, loadImageOptions)
    })
  }

  upload() {
    var formData = new FormData();
    for (var i = 0; i < this.state.files.length; i++) {
      console.log(this.state.files[i]);
      formData.append('image', this.state.files[i].file, this.state.files[i].file.name)
    }
    formData.append('name', this.state.name)
    formData.append('title', this.state.title)
    formData.append('email', this.state.email)

    this.uploadHelper(formData)
  }

  uploadHelper(formData) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.onreadystatechange = () => {
     if(xhr.readyState === 4 && xhr.status === 200){
         console.log(xhr.responseText);
         this.handleClose()
      }
    }

    xhr.upload.onprogress = (e) => {
      console.log("loaded", e.loaded);
      console.log("total", e.total);
      this.setState({progress: e.loaded * 1.0 / e.total * 100})
    }

    xhr.open('POST', url + '/api/upload');
    xhr.send(formData)
  }

  delete() {
    this.setState({files: []})
  }

  render() {
    return (
      <div style={{width: '10%', textAlign: 'right'}}>
        <div className="uploadButton" onClick={this.handleShow}>
          <p>Upload</p>
        </div>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Upload</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{display: 'flex', flexDirection: 'column'}}>
            <div className='uploadTextInputDiv' >
              <label className="required">Name:</label>
              <input type="text" autoComplete="off" name="name" onChange={this.handleChange} value={this.state.name}></input>
              <label className="required">Title:</label>
              <input type="text" autoComplete="off" name="title" onChange={this.handleChange} value={this.state.title}></input>
              <label className="required">Email:</label>
              <input style={{boxShadow: !this.state.emailValid  && this.state.email ? '0 1px 0 0 red' : ''}} 
                type="text" autoComplete="off" name="email" onChange={this.handleEmailChange} value={this.state.email}></input>
            </div>
            <div style={{margin: '30px auto'}}>
              {this.state.files.length > 0 ?
              <div style={{position: 'relative'}}>
                <div className='deleteButton' style={{backgroundImage: 'url(' + deleteButton + ')'}} onClick={this.delete} />
                <CarouselImages images={this.state.files} />
              </div>
              :
              <UploadDropzone acceptImages={this.acceptImages}/>
              }
            </div>
            <button className="submit" onClick={this.upload} disabled={!this.state.name || !this.state.title || !this.state.email || this.state.files.length === 0}>
              <p>Submit</p>
            </button>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

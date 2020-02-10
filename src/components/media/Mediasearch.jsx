/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from 'axios';
import Footer from '../Footer';
import { MEDIA_URL, MEDIA_APIKEY } from '../config';

import Medialistimages from './Medialistimages';
import Medialistvideos from './Medialistvideos';
import './Mediasearch.css';

class Media extends Component {
  constructor(props) {
    super(props);
    this.state = { medias: [], value: 'image' };
  }

    getMedia = (e) => {
      e.preventDefault();
      const media = e.target.elements.media.value;
      const { value } = this.state;
      if (media) { // empty input
        if (value === 'image') {
          axios.get(`${MEDIA_URL}?key=${MEDIA_APIKEY}&q=${media}&image_type=photo&pretty=true`)
            .then((response) => {
              console.log(response.data.hits);
              this.setState({
                medias: response.data.hits, // images
                // value: 'image'
              });
            });
        } else if (value === 'video') {
          axios.get(`${MEDIA_URL}videos/?key=${MEDIA_APIKEY}&q=${media}&pretty=true`)
            .then((response) => {
              this.setState({
                medias: response.data.hits, // videos
                // value: 'image'
              });
            });
        }
      }
      e.target.reset(); // making input empty
    }

    selectChange = (e) => {
      this.setState({ value: e.target.value });
    }

    render() {
      const { value } = this.state;
      const { medias } = this.state;

      if (value === 'image') {
        return (
          <>
            <form onSubmit={this.getMedia}>
              <input name="media" placeholder="e.g. cat" />
&nbsp;&nbsp;
              <select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={this.selectChange}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
&nbsp;
              <button type="submit">GET MEDIA</button>
            </form>
            <Medialistimages medias={medias} />
            <br />
            <br />
            <Footer href="https://pixabay.com/api/docs/" title="Pixabay API" />
          </>
        );
      }
      return (
        <>
          <form onSubmit={this.getMedia}>
            <input name="media" placeholder="e.g. cat" />
&nbsp;&nbsp;
            <select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={this.selectChange}
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
&nbsp;
            <button type="submit">GET MEDIA</button>
          </form>
          <Medialistvideos medias={medias} />
          <br />
          <br />
          <Footer href="https://pixabay.com/api/docs/" title="Pixabay API" />
        </>
      );
    }
}
export default Media;

/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import {
  TextField, FormControl, InputLabel, Select, MenuItem, Button, AppBar, Link,
} from '@material-ui/core';
import { MEDIA_URL } from '../components/config.jsx';
import { MEDIA_APIKEY } from '../components/config.jsx';

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
              <TextField id="standard-basic" label="media" name="media" placeholder="e.g. cat" />
&nbsp;&nbsp;
              <FormControl>
                <InputLabel id="demo-simple-select-label" />
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  onChange={this.selectChange}
                >
                  <MenuItem value="image">Image</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                </Select>
              </FormControl>
&nbsp;
              <Button style={{ margin: '15px' }} type="submit" variant="contained" color="primary" disableElevation>
  GET MEDIA
              </Button>
            </form>
            <div style={{ display: 'flex', justifyContent: 'space-center', flexWrap: 'wrap' }}>
              {medias.map((media) => (
                <div className="card" key={media.id}>
                  <div><img src={media.previewURL} alt="url" style={{ width: '100%', height: '100%' }} /></div>
                  <div>{media.tags}</div>
                </div>
              ))}
            </div>
            <br />
            <br />
            <AppBar position="fixed" color="default" style={{ top: 'auto', bottom: 0 }}>
              <Button color="primary">
                <Link href="https://pixabay.com/api/docs/" color="inherit">
                  <b>Pixabay API</b>
: https://pixabay.com/api/docs/
                </Link>
              </Button>
            </AppBar>
          </>
        );
      }
      return (
        <>
          <h3>Media CARD</h3>
          <form onSubmit={this.getMedia}>
            <TextField id="standard-basic" label="media" name="media" placeholder="e.g. cat" />
&nbsp;&nbsp;
            <FormControl>
              <InputLabel id="demo-simple-select-label" />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={this.selectChange}
              >
                <MenuItem value="image">Image</MenuItem>
                <MenuItem value="video">Video</MenuItem>
              </Select>
            </FormControl>
&nbsp;
            <Button style={{ margin: '15px' }} type="submit" variant="contained" color="primary" disableElevation>
  GET MEDIA
            </Button>
          </form>
          <div style={{ display: 'flex', justifyContent: 'space-center', flexWrap: 'wrap' }}>
            {medias.map((media) => (
              <div className="card" key={media.id}>
                { media.videos && (
                <div>
                  <ReactPlayer
                    url={media.videos.small.url}
                    className="react-player"
                    playing
                    width="100%"
                    height="100%"
                  />
                </div>
                ) }
                <div>{media.tags}</div>
              </div>
            ))}
          </div>
          <br />
          <br />
          <AppBar position="fixed" color="default" style={{ top: 'auto', bottom: 0 }}>
            <Button color="primary">
              <Link href="https://pixabay.com/api/docs/" color="inherit">
                <b>Pixabay API</b>
: https://pixabay.com/api/docs/
              </Link>
            </Button>
          </AppBar>
        </>
      );
    }
}
export default Media;
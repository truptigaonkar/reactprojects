import React, { Component } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

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
          axios.get(`https://pixabay.com/api/?key=14482129-f8f3796c1975d4841314c1735&q=${media}&image_type=photo&pretty=true`)
            .then((response) => {
              this.setState({
                medias: response.data.hits, // images
                // value: 'image'
              });
            });
        } else if (value === 'video') {
          axios.get(`https://pixabay.com/api/videos/?key=14482129-f8f3796c1975d4841314c1735&q=${media}&pretty=true`)
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
            <h3>Media CARD</h3>
            <form onSubmit={this.getMedia}>
              <input type="text" name="media" placeholder="e.g. dog" />
              <select onChange={this.selectChange} value={value}>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
              <button type="submit">GET</button>
            </form>
            <div>
              {medias.map((media) => (
                <ul key={media.id}>
                  <li><img src={media.previewURL} alt="url" style={{ width: '15%', height: '15%' }} /></li>
                  <li>{media.tags}</li>
                </ul>
              ))}
            </div>
          </>
        );
      }
      return (
        <>
          <h3>Media CARD</h3>
          <form onSubmit={this.getMedia}>
            <input type="text" name="media" placeholder="e.g. dog" />
            <select onChange={this.selectChange} value={value}>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            <button type="submit">GET</button>
          </form>
          <div>
            {medias.map((media) => (
              <ul key={media.id}>
                { media.videos && (
                <li>
                  <ReactPlayer
                    url={media.videos.small.url}
                    className="react-player"
                    playing
                    width="15%"
                    height="15%"
                  />
                </li>
                ) }
                <li>{media.tags}</li>
              </ul>
            ))}
          </div>
        </>
      );
    }
}
export default Media;

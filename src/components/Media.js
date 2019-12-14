import React, { Component } from 'react'
import axios from 'axios';

class Media extends Component {
    state = {
        medias: [],
        value: 'select'
    }
    getMedia = e => {
        e.preventDefault();
        const media = e.target.elements.media.value;
        if (media) { //empty input
            if (this.state.value === 'image') {
                axios.get(`https://pixabay.com/api/?key=14482129-f8f3796c1975d4841314c1735&q=${media}&image_type=photo&pretty=true`)
                    .then(response => {
                        console.log(response.data.hits);
                        this.setState({
                            //value: 'select',
                            medias: response.data.hits, //images
                        });
                    })
            } else if (this.state.value === 'video') {
                axios.get(`https://pixabay.com/api/videos/?key=14482129-f8f3796c1975d4841314c1735&q=${media}&pretty=true`)
                    .then(response => {
                        console.log(response.data.hits);
                        this.setState({
                            value: '',
                            medias: response.data.hits, //videos
                        });
                    })
            }
        }

        e.target.reset(); //making input empty
    }
    selectChange = e => {
        this.setState({ value: e.target.value });
    }
    render() {
        if (this.state.value === 'image') {
            return (
                <>
                    <h3>Media CARD</h3>
                    <form onSubmit={this.getMedia}>
                        <input type='text' name='media' placeholder='e.g. dog' />
                        <select onChange={this.selectChange} value={this.state.value}>
                            <option value="select">Select</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                        <button>GET</button>
                    </form>
                    {this.state.medias.map(media => (
                        <tr key={media.id}>
                            <td><img src={media.previewURL} style={{ width: '300px' }} /></td>
                        </tr>
                    ))}
                </>
            );
        } else {
            return (
                <>
                    <h3>Media CARD</h3>
                    <form onSubmit={this.getMedia}>
                        <input type='text' name='media' placeholder='e.g. dog' />
                        <select onChange={this.selectChange} value={this.state.value}>
                            <option value="select">Select</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                        <button>GET</button>
                    </form>

                    {this.state.medias.map(media => (
                        <tr key={media.id}>
                            <td><video src={media.videos.small.url} width='300px' /></td>
                        </tr>
                    ))}
                </>
            );
        }
    }
}
export default Media;

import React, { Component } from 'react';
import api from '../services/api';

import './New.css'

class New extends Component {

    state = {
        image: null,
        autor: '',
        place: '',
        description: '',
        hashtags: ''
    }

    handleSubmit = async e => {
        e.preventDefault();

        const data = new FormData();

        data.append('image', this.state.image);
        data.append('autor', this.state.autor);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        await api.post('posts', data);

        this.props.history.push('/');
    }

    handleImageChange = e => {
        this.setState({ image: e.target.files[0] });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file"  onChange={this.handleImageChange} />
                <input type="text" name="autor" placeholder="Autor" onChange={this.handleChange} value={this.state.autor} />
                <input type="text" name="place" placeholder="place" onChange={this.handleChange} value={this.state.place} />
                <input type="text" name="description" placeholder="description" onChange={this.handleChange} value={this.state.description} d />
                <input type="text" name="hashtags" placeholder="hashtags" onChange={this.handleChange} value={this.state.hashtags} />
                <button type="submit">Enviar</button>

            </form>
        );
    }
}

export default New;
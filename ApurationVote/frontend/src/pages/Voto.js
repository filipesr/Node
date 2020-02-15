import React, { Component } from 'react';
import api from '../services/api';

import './Voto.css'

class Voto extends Component {

    state = {
        image: null,
        cod: '',
        cpf: '',
        votoVice: '',
        votoSecr: '',
        votoTeso: '',
        votoExam: ''
    }

    handleSubmit = async e => {
        e.preventDefault();

        const data = new FormData();

        data.append('image', this.state.image);
        data.append('cod', this.state.cod);
        data.append('cpf', this.state.cpf);
        data.append('votoVice', this.state.votoVice);
        data.append('votoSecr', this.state.votoSecr);
        data.append('votoTeso', this.state.votoTeso);
        data.append('votoExam', this.state.votoExam);

        await api.post('cedula', data);

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
                <div className="card" >
                    <input type="text" name="cod" placeholder="Código do membro" onChange={this.handleChange} value={this.state.cod} />
                    <input type="file" onChange={this.handleImageChange} />
                    <button type="submit">Salvar</button>
                </div>
                <div className="card">
                    <input type="text" name="votoVice" placeholder="Vice Presidência" onChange={this.handleChange} value={this.state.votoVice} />
                </div>
                <div className="card">
                    <input type="text" name="votoSecr" placeholder="Secretaria" onChange={this.handleChange} value={this.state.votoSecr} />
                </div>
                <div className="card">
                    <input type="text" name="votoTeso" placeholder="Tesouraria" onChange={this.handleChange} value={this.state.votoTeso} />
                </div>
                <div className="card">
                    <input type="text" name="votoExam" placeholder="Exame de Contas" onChange={this.handleChange} value={this.state.votoExam} />
                </div>

            </form>
        );
    }
}

export default Voto;
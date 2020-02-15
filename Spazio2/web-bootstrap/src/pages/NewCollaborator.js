import React, { Component } from "react";
import api from "../services/api";

// import { Container } from './styles';

export default class NewKid extends Component {
  state = {
    avatar: null,
    name: "",
    phone: "",
    birth: "",
    cpf: "",
    password: ""
  };

  handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();

    data.append("avatar", this.state.avatar);
    data.append("name", this.state.name);
    data.append("phone", this.state.phone);
    data.append("birth", this.state.birth);
    data.append("cpf", this.state.cpf);
    data.append("password", this.state.password);

    await api.post("/api/new/collaborator", data);

    this.props.history.push("/collaborator");
  };

  handleAvatarChange = e => {
    this.setState({ avatar: e.target.files[0] });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="page-content">
        <div className="page-title">Adicionar colaborador</div>
        <form
          id="new-kid-post"
          onSubmit={this.handleSubmit}
          className="pure-form pure-form-aligned "
        >
          <fieldset>
            <div className="pure-control-group">
              <label>Foto</label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={this.handleAvatarChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="pure-control-group ">
              <label>Nome:</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="pure-control-group ">
              <label>CPF:</label>
              <input
                type="number"
                name="cpf"
                id="cpf"
                onChange={this.handleChange}
                value={this.state.cpf}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="pure-control-group ">
              <label>Senha:</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={this.handleChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="pure-control-group">
              <label>Telefone 1:</label>
              <input
                type="number"
                name="phone"
                  id="phone"
                  onChange={this.handleChange}
                  value={this.state.phone}
              />
            </div>
          </fieldset>
          <fieldset>
            <label>Data de Nascimento:</label>
            <input
              type="date"
              name="birth"
              id="birth"
              onChange={this.handleChange}
              value={this.state.birth}
            />
          </fieldset>
          <fieldset>
            <div className="pure-control">
              <button
                type="submit"
                className="pure-button pure-input-1 pure-button-primary"
              >
                Cadastrar
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

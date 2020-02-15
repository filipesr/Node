import React, { Component } from "react";
import api from "../services/api";

// import { Container } from './styles';

export default class NewParent extends Component {
  state = {
    name: "",
    phone: "",
    phone2: "",
    cpf: "",
    termAccepted: "1",
    sending:0
  };

  handleSubmit = async e => {
    e.preventDefault();
    if(!this.state.cpf || !this.state.name || !this.state.phone)
      return;   

    this.setState({sending:1});  
    
    let data = new FormData();

    data.append("name", this.state.name);
    data.append("phone", this.state.phone);
    data.append("phone2", this.state.phone2);
    data.append("cpf", this.state.cpf);
    data.append("termAccepted", this.state.termAccepted);    
    
    await api.post("/api/parent/new", data)
    .then(response => {
      this.props.history.push(`/kid?parent=${response.data.parent}`);
    })
    .catch(error => {
      window.location.href = "/login";
    });

    //this.props.history.push(`/parent`);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleTermChange = e => {
    this.setState({ termAccepted: e.target.value === "1" });
  };
  render() {
    return (
      <div className="page-content">
        <div className="page-title">Adicionar responsável - <a href="/parent">Voltar</a></div>

        <form
          id="new-kid-post"
          onSubmit={this.handleSubmit}
          className="pure-form pure-form-stacked "
        >
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
            <div className="pure-control-group">
              <label>Telefone 2:</label>
              <input
                type="number"
                name="phone2"
                id="phone2"
                onChange={this.handleChange}
                value={this.state.phone2}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="pure-control-group ">
              <label>Termo aceito:</label>
              <div className="sep-div">
                <div>
                  <input
                    type="radio"
                    name="termAccepted"
                    id="termAccepted"
                    value="1"
                    checked="1"
                    onChange={this.handleTermChange}
                  /> Sim
                </div>
                <div>
                  <input
                    type="radio"
                    name="termAccepted"
                    id="termAccepted"
                    value="0"
                    onChange={this.handleTermChange}
                  /> Não
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="pure-control">
              <button
                type="submit"
                className="pure-button pure-input-1 pure-button-primary"
                disabled={this.state.sending}
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

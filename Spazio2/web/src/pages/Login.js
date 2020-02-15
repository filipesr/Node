import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import api from "../services/api";

import { login } from "../services/auth";

import "./Login.css";

var querystring = require('querystring');

class Login extends Component {
  state = {
    cpf: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { cpf, password } = this.state;
    if (!cpf || !password) {
      this.setState({ error: "Preencha o cpf e a senha para continuar!" });
    } else {
      try {
        //const response = await api.post("/login", querystring.stringify({ cpf, password }));
        const response = await api.post("/login", querystring.stringify({ cpf, password }));
        login(response.data.token);
        this.props.history.push("/");
      } catch (err) {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(err.response.data);
          console.error(err.response.status);
          console.error(err.response.headers);
        } else if (err.request) {
          // The request was made but no response was received
          // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.error(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error", err.message);
        }
        this.setState({
          error: "Erro no login? " + err
        });
      }
    }
  };

  render() {
    return (
      <div className="div-container">
        <form className="login" onSubmit={this.handleSignIn}>
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="number"
            placeholder="CPF:"
            onChange={e => this.setState({ cpf: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha:"
            onChange={e => this.setState({ password: e.target.value })}
          />

          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);

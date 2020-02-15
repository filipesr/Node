import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, Row, Col, Alert, Container } from "react-bootstrap";

import api from "../services/api";

import "./Login.css";

import { login } from "../services/auth";

var querystring = require("querystring");

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
        const response = await api.post(
          "/login",
          querystring.stringify({ cpf, password })
        );
        login(response.data.token);
        this.props.history.push("/");
      } catch (err) {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(err.response.data);
          console.error(err.response.status);
          console.error(err.response.headers);
          this.setState({
            error: err.response.data.mensagem
          });
        } else if (err.request) {
          // The request was made but no response was received
          // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.error(err.request);
          this.setState({
            error: err.request
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error", err.message);
          this.setState({
            error: err.message
          });
        }
      }
    }
  };

  render() {
    return (
      <Container fluid="true">
        <Form onSubmit={this.handleSignIn} id="form-login" className="align-self-center, col-sm-6, col-md-3">
          <Form.Group as={Row}>
            <Col className="align-items-center">
              <Form.Control
                required
                size="lg"
                type="number"
                placeholder="CPF"
                onChange={e => this.setState({ cpf: e.target.value })}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="justify-content-md-center">
            <Col>
              <Form.Control
                type="password"
                size="lg"
                placeholder="Senha:"
                onChange={e => this.setState({ password: e.target.value })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="justify-content-md-center">
            <Col>
              <Button variant="primary" size="lg" block type="submit">
                Entrar
              </Button>
            </Col>
          </Form.Group>
          {this.state.error && (
            <Alert variant="danger">
              <Alert.Heading>Erro!</Alert.Heading>
              <p>{this.state.error}</p>
            </Alert>
          )}
        </Form>
      </Container>
    );
  }
}

export default withRouter(Login);

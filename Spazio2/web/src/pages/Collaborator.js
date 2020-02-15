import React, { Component } from "react";
import api from "../services/api";

import { URLSERVER } from '../constants';
// import socketIOClient from "socket.io-client";

import "./Visit.css";

import icon_call1 from "../assets/icon_call1.png";
import icon_add_green from "../assets/icon_add_green.png";

export default class Collaborator extends Component {
  state = {
    lista: []
  };

  async componentDidMount() {
    // const { endpoint } = this.state;
    // //Very simply connect to the socket
    // const socket = socketIOClient(endpoint);
    // //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
    // socket.on("outgoing data", data => this.setState({response: data.num}));

    const response = await api.get("/api/collaborator");
    this.setState({ lista: response.data.lista });
  }

  render() {
    return (
      <div className="page-content">
        <div className="page-title">
          <a href="/new-collaborator">
            <img src={icon_add_green} alt="" />
          </a>
          Colaboradores
        </div>
        <section id="post-list">
          {this.state.lista.map(item => (
            <article key={item.id}>
              <header>
                <div className="user-info">
                  <span>
                    <strong>{item.name}</strong>
                  </span>
                </div>
              </header>

              <img
                src={`${URLSERVER}/files/${item.avatar}`}
                alt=""
              />
              <footer>
                <div className="actions">
                  <a href={`tel:${item.phone}`}>
                    <img src={icon_call1} alt="" />
                  </a>
                </div>
              </footer>
            </article>
          ))}
        </section>
      </div>
    );
  }
}

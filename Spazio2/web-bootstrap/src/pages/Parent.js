import React, { Component } from "react";
import api from "../services/api";

import "./Kid.css";


import icon_add_purple from "../assets/icon_add_purple.png";
import icon_heart from "../assets/icon_heart.png";

var querystring = require("querystring");

export default class Kid extends Component {
  state = {
    lista: []
  };
  async componentDidMount() {
    await api.get("/api/parent")
    .then(response => {
      this.setState({ lista: response.data.lista });
    })
    .catch(error => {
      window.location.href = "/login";
    });
    
  }

  async kidSair(bracelet, event) {
    await api.post(
      "/api/visit/out",
      querystring.stringify({ bracelet, event })
    );
    const lista = this.state.lista.filter(
      visita => visita.bracelet !== bracelet
    );
    this.setState({ lista: lista });
  }

  render() {
    return (
      <table className="pure-table pure-table-bordered">
        <thead>
          <tr>
            <th colSpan="5"><a href="/new-parent"><img src={icon_add_purple} alt="" /></a>Responsáveis</th>
          </tr>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Telefones</th>
            <th>Termo</th>
            <th>Crianças</th>
          </tr>
        </thead>
        <tbody>
          {this.state.lista.map((item, index) => (
            <tr key={item.id} className={index % 2 && "pure-table-odd"}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.phone}{item.phone2 && (` | `) }{item.phone2}</td>
              <td>{item.termAccepted ? 'Sim':'Não'}</td>
              <td><a href={`/kid?parent=${item.id}`}><img src={icon_heart} alt="" /></a></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

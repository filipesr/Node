import React, { Component } from "react";
import api from "../services/api";

import { URLSERVER } from '../constants';

// import socketIOClient from "socket.io-client";

import "./Dash.css";

function tempoRestante(horaInicio) {
  var hrIni = horaInicio.split(":");
  var agora = new Date();
  var min = (agora.getHours() - hrIni[0]) * 60;
  min += agora.getMinutes();
  min -= hrIni[1];
  min -= 60;

  return min > 0 ? `${-min}!` : -min;
}

export default class Dash extends Component {
  intervalID;
  state = {
    lista: [],
    total:0
  };
  async componentDidMount() {
    document.getElementById('menu').remove();
    document.getElementById('menuLink').remove();
    await this.getData();
    this.intervalID = setInterval(this.getData.bind(this), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  async getData() {
    await api
      .get("/dash")
      .then(response => {
        this.setState({ lista: response.data.lista });
        this.setState({ total: response.data.total });
      })
      .catch(error => {
        window.location.href = "/login";
      });
  }  

  render() {
    return (
      <div className="page-content">
        <div className="page-title">Crianças visitantes - Total: {this.state.total}</div>
        <section id="post-list">
          {this.state.lista.map(vis => (
            <article className={`${vis.Kid.gender}`} key={vis.bracelet}>
              <header>
                <div className="user-info">
                  <span>
                    <strong>[{vis.bracelet}]</strong> {vis.Kid.name}
                  </span>
                </div>

                <span>{tempoRestante(vis.timeIn)}</span>
              </header>

              <img
                src={`${URLSERVER}/files/${vis.Kid.avatar}`}
                alt=""
              />
            </article>
          ))}
        </section>
      </div>
    );
  }
}

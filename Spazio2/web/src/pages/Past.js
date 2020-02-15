import React, { Component } from "react";
import api from "../services/api";

import { URLSERVER } from '../constants';

// import socketIOClient from "socket.io-client";

import "./Visit.css";

import icon_call1 from "../assets/icon_call1.png";
import icon_call2 from "../assets/icon_call2.png";
import icon_add_white from "../assets/icon_add_white.png";

var querystring = require("querystring");

function tempoPermanencia(horaInicio, horaFim) {
  //15:01:34
  var hrIni = horaInicio.split(":");
  var hrFim = horaFim.split(":");
  var min = (parseInt(hrFim[0], 10) - parseInt(hrIni[0], 10)) * 60;
  min += parseInt(hrFim[1]);
  min -= parseInt(hrIni[1]);

  return min;
}

export default class Visit extends Component {
  intervalID;
  state = {
    lista: [],
    total:0
  };

  async kidCancelOut(bracelet, event) {
    await api.post("/api/visit/cancelOut", querystring.stringify({ bracelet, event }));
    const lista = this.state.lista.filter(
      visita => visita.bracelet !== bracelet
    );
    this.setState({ lista: lista });
  }

  async componentDidMount() {
    await this.getData();
    this.intervalID = setInterval(this.getData.bind(this), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  async getData() {
    await api
      .get("/api/past")
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
        <div className="page-title">Crianças visitantes - Total:{this.state.total}</div>
        <section id="post-list">
          {this.state.lista.map(vis => (
            <article className={`${vis.Kid.gender}`} key={vis.bracelet}>
              <header>
                <div className="user-info">
                  <span>
                    <strong>[{vis.bracelet}]</strong> {vis.Kid.name}
                  </span>
                </div>

                <span>{tempoPermanencia(vis.timeIn, vis.timeOut)}</span>
              </header>
              <img
                src={`${URLSERVER}/files/${vis.Kid.avatar}`}
                alt=""
              />

              <footer>
                <div className="actions">
                  <a href={`tel:${vis.Parent.phone}`}>
                    <img src={icon_call1} alt="" />
                  </a>
                  {vis.Parent.phone2 && (
                    <a href={`tel:${vis.Parent.phone2}`}>
                      <img src={icon_call2} alt="" />
                    </a>
                  )}
                  <img
                    src={icon_add_white}
                    alt=""
                    onClick={e => this.kidCancelOut(vis.bracelet, vis.Event.id, e)}
                  />
                </div>
              </footer>
            </article>
          ))}
        </section>
      </div>
    );
  }
}

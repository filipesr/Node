import React, { Component } from "react";
import api from "../services/api";

import "./Wait.css";
import icon_inn from "../assets/icon_inn.png";

var querystring = require("querystring");

export default class Wait extends Component {
  intervalID;

  state = {
    visitas: [],
    total:0
  };

  async kidIn(bracelet, event) {
    await api.post("/api/visit/in", querystring.stringify({ bracelet, event }));
    const visitas = this.state.visitas.filter(
      visita => visita.bracelet !== bracelet
    );
    this.setState({ visitas: visitas });
  }

  async componentDidMount() {
    await this.getData();
    this.intervalID = setInterval(this.getData.bind(this), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  async getData() {
    const response = await api.get("/api/wait");
    this.setState({ visitas: response.data.lista });
    this.setState({ total: response.data.total });
    const responseVisit = await api.get("/api/visit?total=1");
    this.setState({ totalVisits: responseVisit.data.total });
  }
  render() {
    return (
      <div className="page-content">
        <div className="page-title">Fila de espera - Total: {this.state.total} / {this.state.totalVisits}</div>

        <section id="wait-list">
          {this.state.visitas.map(vis => (
            <article className={`${vis.Kid.gender}`} key={vis.bracelet}>
              <header>
                <div className="user-info">
                  <span>
                    <strong>[{vis.bracelet}]</strong> {vis.Kid.name}
                  </span>
                </div>
                <img
                  src={icon_inn}
                  alt="Entrada"
                  onClick={e => this.kidIn(vis.bracelet, vis.Event.id, e)}
                />
              </header>
            </article>
          ))}
        </section>
      </div>
    );
  }
}

import React, { Component } from "react";
import api from "../services/api";
import {
  Navbar,
  Nav,
  FormControl,
  Form,
  Alert
} from "react-bootstrap";

import { URLSERVER } from "../constants";

// import socketIOClient from "socket.io-client";

import "./Visit.css";

import icon_call1 from "../assets/icon_call1.png";
import icon_call2 from "../assets/icon_call2.png";
import icon_out from "../assets/icon_out.png";

var querystring = require("querystring");

function tempoRestante(horaInicio) {
  var hrIni = horaInicio.split(":");
  var agora = new Date();
  var min = (agora.getHours() - hrIni[0]) * 60;
  min += agora.getMinutes();
  min -= hrIni[1];
  min -= 60;

  //return min > 0 ? "0!" : -min;
  return min > 0 ? `${-min}!` : -min;
}

export default class Visit extends Component {
  intervalID;
  state = {
    lista: [],
    total: 0
  };
  async kidSair(bracelet, event) {
    await api.post(
      "/api/visit/out",
      querystring.stringify({ bracelet, event })
    );
    const lista = this.state.lista.filter(
      visita => visita.bracelet !== bracelet
    );
    this.setState({ lista: lista });
    this.setState({ total: this.state.total - 1 });
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
      .get("/api/visit")
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
      <div>
        <Navbar>
          <Nav fill className="mr-auto" variant="tabs" defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link disabled href="/">Visitantes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/parent">Responsáveis</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/wait">Fila de espera</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/past">Já passaram</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/collaborator">Colaboradores</Nav.Link>
            </Nav.Item>
          </Nav>
          <Form>
            <FormControl
              type="text"
              placeholder="Pesquisar"
            />
          </Form>
        </Navbar>
        <Alert variant="info" className="text-center text-sm-left">
          Total de crianças visitantes: {this.state.total}
        </Alert>
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

              <img src={`${URLSERVER}/files/${vis.Kid.avatar}`} alt="" />

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
                    src={icon_out}
                    alt=""
                    onClick={e => this.kidSair(vis.bracelet, vis.Event.id, e)}
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

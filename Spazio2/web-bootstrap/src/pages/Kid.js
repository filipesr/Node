import React, { Component } from "react";
import api from "../services/api";

import "./Kid.css";

import icon_edit from "../assets/icon_edit.png";
import icon_add_blue from "../assets/icon_add_blue.png";

var querystring = require("querystring");

//2013-12-10T00:00:00.000Z
function calcAge(dateString) {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / 31557600000);
}

export default class Kid extends Component {
  state = {
    lista: [],
    parent: 0
  };
  async componentDidMount() {
    const parsed = querystring.parse(this.props.location.search);
    const parent = parsed["?parent"];
    if (!parent) this.props.history.push("/parent");
    this.setState({ parent: parent });
    const response = await api.get("/api/kid?parent=" + parent);
    this.setState({ lista: response.data.lista });
  }

  render() {
    return (
      <table className="pure-table pure-table-bordered">
        <thead>
          <tr>
            <th colSpan="4"><a href="/parent">Voltar</a> - 
              <a href={`/new-kid?parent=${this.state.parent}`}>
                <img src={icon_add_blue} alt="" />
              </a>
              Crianças
            </th>
          </tr>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {this.state.lista.map((item, index) => (
            <tr key={item.id} className={index % 2 && "pure-table-odd"}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{calcAge(item.birth)} anos</td>
              <td>{item.Visits.length > 0 && `[${item.Visits[0].bracelet}]`}{!item.Visits.length &&
                <a href={`/new-kid?id=${item.id}`}>
                  <img src={icon_edit} alt="" />
                </a>
              }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

import React, { Component } from "react";
import api from "../services/api";

// import { Container } from './styles';
var querystring = require("querystring");

function calcAge(dateString) {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / 31557600000);
}

export default class NewKid extends Component {
  state = {
    avatar: null,
    bracelet: "",
    name: "",
    birth: "",
    gender: "boy",
    parent: 0,
    restriction: 0,
    id: 0,
    sending:0
  };

  async componentDidMount() {
    const parsed = querystring.parse(this.props.location.search);
    const parent = parsed["?parent"];
    if (parent) this.setState({ parent: parent });
    const id = parsed["?id"];
    if (id) {
      this.setState({ id: id });
      const response = await api.get("/api/kid?id=" + id);
      this.setState(response.data.lista[0]);
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    if(!this.state.avatar){
      window.alert("Falta a foto!");
      return;
    }

    if(!this.state.birth){
      window.alert("Falta o aniversário!");
      return;
    }

    let age = calcAge(this.state.birth);

    if(age > 10 || age < 3){
      window.alert(`Idade não permitida! ${age} anos!`);
      return;
    }

    this.setState({sending:1});

    const data = new FormData();

    data.append("avatar", this.state.avatar);
    data.append("bracelet", this.state.bracelet);
    data.append("name", this.state.name);
    data.append("birth", this.state.birth);
    data.append("gender", this.state.gender);
    data.append("parent", this.state.parent);
    data.append("restriction", this.state.restriction);
    data.append("id", this.state.id);
    data.append("event", 1);

    await api.post("/api/kid/new", data)
    .then(response => {
      this.props.history.push(`/kid?parent=${this.state.parent}`);
    })
    .catch(error => {
      window.location.href = "/login";
    });

  };

  handleAvatarChange = e => {
    this.setState({ avatar: e.target.files[0] });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleGenderChange = e => {
    this.setState({ gender: e.target.value });
  };

  render() {
    return (
      <div className="page-content">
        <div className="page-title">Adicionar criança - <a href={`/kid?parent=${this.state.parent}`}>Voltar</a></div>

        <form
          id="new-kid-post"
          onSubmit={this.handleSubmit}
          className="pure-form pure-form-stacked "
        >
          {!this.state.id && 
          <fieldset>
            <div className="pure-control-group">
              <label>Foto</label>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={this.handleAvatarChange}
                />
            </div>
          </fieldset>}
          <fieldset>
            <div className="pure-control-group ">
              <label>Pulseira: {this.state.name}</label>
              <input
                type="number"
                name="bracelet"
                id="bracelet"
                onChange={this.handleChange}
                value={this.state.bracelet}
              />
            </div>
          </fieldset>
          {!this.state.id && 
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
          </fieldset>}
          {!this.state.id && 
          <fieldset>
            <div className="pure-control-group">
              <label>Data de Nascimento:</label>
              <input
                type="date"
                name="birth"
                id="birth"
                onChange={this.handleChange}
                value={this.state.birth}
              />
            </div>
          </fieldset>}
          {!this.state.id && 
          <fieldset>
            <div className="pure-control-group ">
              <label>Sexo:</label>
              <div className="sep-div">
                <div>
                  <input
                    type="radio"
                    name="genderBoy"
                    id="gender"
                    value="boy"
                    onChange={this.handleGenderChange}
                    checked={this.state.gender === "boy"}
                  /> Menino
                </div>
                <div>
                  <input
                    type="radio"
                    name="genderGirl"
                    id="gender"
                    value="girl"
                    onChange={this.handleGenderChange}
                    checked={this.state.gender === "girl"}
                  /> Menina
                </div>
              </div>
            </div>
          </fieldset>
        }
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

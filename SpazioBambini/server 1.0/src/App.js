import React, { Component } from "react";
import { Card, CardDeck } from 'react-bootstrap';
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      itemList: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:3333/visita")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ itemList: responseJson.lista });
      });
  }

  render() {
    return (
      <div>
        <center><h1>Crianças</h1></center>
        <CardDeck style={{ padding: '1rem' }}>
          {this.state.itemList.map((crianca) => (
            <Card border="primary" style={{ maxWidth: '18rem' }}>
              <Card.Img variant="top" src={`http://localhost:3333/files/crianca_${crianca.Crianca.nome}.jpg`} />
              <Card.Body>
                <Card.Title>[{crianca.codigoPulseira}] {crianca.Crianca.nome}</Card.Title>
                <Card.Text>Responsável: {crianca.Responsavel.nome}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">{crianca.horaEntrada}</small>
              </Card.Footer>
            </Card>
          ))}
        </CardDeck>
      </div>
    );
  }
}
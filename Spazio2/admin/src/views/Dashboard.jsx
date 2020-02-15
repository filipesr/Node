/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

let infoAtualizacao = "Atualizado em 19/10/2019";

class Dashboard extends Component {
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={4} xs={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-smile text-success" />}
                statsText="Total de visitas"
                statsValue="980"
                statsIcon={<i className="fa fa-child" />}
                statsIconText="761 crianças"
              />
            </Col>
            <Col lg={3} sm={4} xs={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-success" />}
                statsText="Total de pais"
                statsValue="560"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={infoAtualizacao}
              />
            </Col>
            <Col lg={3} sm={4} xs={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-like text-danger" />}
                statsText="Colaboradores"
                statsValue="48"
                statsIcon={<i className="fa fa-bullhorn" />}
                statsIconText="Mais de 200 envolvidos"
              />
            </Col>
            <Col lg={3} sm={4} xs={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-cash text-warning" />}
                statsText="Total doado"
                statsValue="R$1.300,00"
                statsIcon={<i className="fa fa-money" />}
                statsIconText={infoAtualizacao}
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Gráfico de visitas"
                category="Consolidado por dia"
                stats={infoAtualizacao}
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Estatística por gênero"
                category="Visitas de meninos e meninas"
                stats={infoAtualizacao}
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
            <Col md={12}>
              <Card
                id="chartActivity"
                title="Idade"
                category="Crianças por idade"
                stats={infoAtualizacao}
                statsIcon="fa fa-clock-o"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;

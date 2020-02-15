import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

import icon_visit from "../assets/icon_visit.png";
import icon_add_blue from "../assets/icon_add_blue.png";
import icon_add_green from "../assets/icon_add_green.png";
import icon_add_purple from "../assets/icon_add_purple.png";
import icon_wait from "../assets/icon_wait.png";

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/"><img src={icon_visit} alt="" /><span>Visita</span></Link>
        <Link to="/kid"><img src={icon_add_blue} alt="" /><span>Criança</span></Link>
        <Link to="/parent"><img src={icon_add_green} alt="" /><span>Pai</span></Link>
        <Link to="/collaborator"><img src={icon_add_purple} alt="" /><span>Colaborador</span></Link>
        <Link to="/wait"><img src={icon_wait} alt="" /><span>Fila</span></Link>
      </div>
    </header>
  );
}

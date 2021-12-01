import React, { Component } from "react";

import Sidebar2 from "../components/Sidebar2";
import Navbar2 from "../components/Navbar2";
import GestionUsuarios from "../components/GestionUsuarios";

export default class Dashboard extends Component {
  render() {
    require("../assets/css/sb-admin-2.min.css");

    return (
      <React.Fragment>
        <div id="wrapper">
          <Sidebar2></Sidebar2>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar2></Navbar2>
              <GestionUsuarios></GestionUsuarios>
              {/* <HomeDashboard></HomeDashboard>  */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

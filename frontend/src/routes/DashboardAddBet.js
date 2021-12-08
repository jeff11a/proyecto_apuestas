import React, { Component } from "react";

import Sidebar2 from "../components/Sidebar2";
import Navbar2 from "../components/Navbar2";
import AddBet from "../components/dashboard/AddBet";

import "../assets/css/sb-admin-2.css"

export default class DashboardUser extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="dashboard">
          <Sidebar2></Sidebar2>
          <div id="content-dashboard" className="d-flex flex-column">
            <div id="content">
              <Navbar2></Navbar2>
              <div className="row">
                  <div className="col-3">
                  </div>
                  <div className="col">
                    <AddBet></AddBet>
                  </div>
                  <div className="col-3">
                  </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
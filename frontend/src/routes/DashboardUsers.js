import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

import Sidebar2 from "../components/Sidebar2";
import Navbar2 from "../components/Navbar2";
import UsersList from "../components/dashboard/UsersList";

const DashboardUser = () => {
  let navigate = useNavigate();

  const [showInternoBoard, setShowInternoBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const redirect = () => {
    return navigate("/login");
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setShowInternoBoard(user.roles.includes("ROLE_INTERNO"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    } else {
      navigate("/login")
    }
  }, []);



  return (
    <React.Fragment>
      {(showAdminBoard || showInternoBoard) ?
        (
          <div id="dashboard">
            <Sidebar2></Sidebar2>
            <div id="content-dashboard" className="d-flex flex-column">
              <div id="content">
                <Navbar2></Navbar2>
                <UsersList></UsersList>
              </div>
            </div>
          </div>
        ) : redirect()
      }
    </React.Fragment>
  )


}

export default DashboardUser;
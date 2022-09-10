import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import logo from "./assets/psn-logo-large.png";
import MyProfile from "./MyProfile";

import {
  RiNewspaperLine,
  RiRadarLine,
  RiBaseStationLine,
  RiFolderUserLine,
  RiLogoutBoxLine,
  RiDownloadLine,
} from "react-icons/ri";

import styles from "./styles/NewsFeed.module.css";
import NewsFeedContent from "./NewsFeedContent";

function NewsFeed() {
  let navigate = useNavigate();

  function handleClick(e) {
    navigate("/newsfeed/allaccounts");
  }

  

  useEffect(() => {
      console.log(localStorage.getItem("psnToken"));
      console.log(localStorage.getItem("psnUsername"));
      localStorage.setItem("flag",1);

  });

  return (
    <div>
      

      <Row>
          
        <Col md={5}>

        <Navbar bg="light" expand="lg" className="mb-3 mb-sm-0">
            <Container className={styles.navbarContainer}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav bg="dark" className={styles.navContainer}>
                <ul className="list-group">
                <Nav.Link>
                  <Link to="/newsfeed" className="text-decoration-none">
                    <li className="list-group-item fs-5 py-3 text-success shadow">
                      <span>
                        {" "}
                        <RiNewspaperLine /> Newsfeed
                      </span>
                    </li>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                <Link to="allaccounts" className="text-decoration-none">
                    <li className="list-group-item fs-5 py-3 text-success shadow">
                      <span>
                        <RiBaseStationLine /> All Users
                      </span>
                    </li>
                    </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="myprofile" className="text-decoration-none">
                    <li className="list-group-item fs-5 py-3 text-success shadow">
                      <span>
                        <RiFolderUserLine /> My Posts
                      </span>
                    </li>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <li
                    className={`list-group-item fs-5 py-3 text-success shadow ${styles.signOutButton}`}

                  >
                    <span>
                      <RiLogoutBoxLine /> Sign Out
                    </span>
                  </li>
                </Nav.Link>
                </ul>
              </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
        
          
        </Col>
    
        <Col md={7}>
          <Outlet />
        </Col>
      </Row>
    </div>
  );
}

export default NewsFeed;
import React, { Component } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";
import "toastr/build/toastr.css";
import toastr from "toastr";

const Navbar = () => {
  const userKeluarAkun = () => {
    signOut(auth)
      .then(() => {
        console.log("udah keluar akun berhasil");
        toastr.success("Anda berhasil logout")
        window.location = "/";
      })
      .catch((error) => console.log(error));
  };
  // render() {
    return (
      <div>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                <i className="fas fa-bars" />
              </a>
            </li>
            {/* <li className="nav-item d-none d-sm-inline-block">
              <a href="index3.html" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="#" className="nav-link">
                Contact
              </a>
            </li> */}
          </ul>
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            {/* Navbar Search === delete*/}

            {/* Messages Dropdown Menu  === delete*/}

            {/* Notifications Dropdown Menu */}
            {/* <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-bell" />
                <span className="badge badge-warning navbar-badge">15</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">15 Notifications</span>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <i className="fas fa-envelope mr-2" /> 4 new messages
                  <span className="float-right text-muted text-sm">3 mins</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <i className="fas fa-users mr-2" /> 8 friend requests
                  <span className="float-right text-muted text-sm">12 hours</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <i className="fas fa-file mr-2" /> 3 new reports
                  <span className="float-right text-muted text-sm">2 days</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item dropdown-footer">
                  See All Notifications
                </a>
              </div>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" onClick={userKeluarAkun} role="button">
                {/* <button type="button" class="btn btn-info"> */}
                Logout
                {/* </button>s */}
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/register" role="button">
                Ujicoba Regis
              </a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                <i className="fas fa-expand-arrows-alt" />
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
                <i className="fas fa-th-large" />
              </a>
            </li> */}
          </ul>
        </nav>
      </div>
    );
  // }
}

export default Navbar;

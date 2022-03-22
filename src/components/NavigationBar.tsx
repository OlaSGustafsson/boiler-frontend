import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const NavigationBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a
            href="https://eldstorpsolutions.se"
            title="Gå till eldstorpsolutions.se"
            rel="noopener noreferrer"
            className="navbar-item"
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="15 55 120 100"
              preserveAspectRatio="xMidYMid meet"
              width="50"
              height="50"
            >
              <path
                className="logo"
                d="M67.3,111.3l-33.2,0c0.6,8,5.2,12.7,12.1,12.7c8.3,0,16.8-4.7,16.8-4.7l4.3,8.3s-10,8.4-22.8,8.4c-17.2,0-26-10-26-27c0-17.5,9.9-29,26.7-29c14.9,0,22.7,9.2,22.7,23.5c0,3.8-0.6,7.5-0.6,7.8z M34.3,102l18.1,0c0-5.7-2.4-10-8.2-10c-5.6,0-9.1,4.1-9.9,10z M100.851,149.6l0-13.5c-9.2-0.5-17-3.2-17-3.2l0-17.7l9.2,0l1.5,7.5s3.4,1.8,8.7,1.8c6,0,11.2-2.3,11.2-7.1c0-10.7-30.6-5.6-30.6-28.4c0-10.4,7-16.8,17-18.7l0-11.8l10.7,0l0,11.4c8.6,0.7,15.6,3.6,15.6,3.6l-0.4,16.4l-8.6,0l-1.9-7.4s-4.2-1.5-8-1.5c-6.4,0-9.7,2.7-9.7,6.3c0,10.6,30.5,6.2,30.5,27.9c0,11.2-7.2,18.1-17.5,20.3l0,14.1l-10.7,0z"
              />
            </svg>
          </a>
          {/* eslint-disable-next-line */}
          <a
            className="navbar-burger burger"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="menu"
            aria-expanded="false"
            data-target="damBurger"
          >
            <span aria-hidden="true" style={{ height: 2 + "px" }}></span>
            <span aria-hidden="true" style={{ height: 2 + "px" }}></span>
            <span aria-hidden="true" style={{ height: 2 + "px" }}></span>
          </a>
        </div>
        <div
          id="damBurger"
          className={"navbar-menu" + (showMenu ? " is-active" : "")}
        >
          <div className="navbar-start">
            <div className="navbar-item">
              <div className="field">
                <div className="control">
                  <NavLink
                    className={({ isActive }) => {
                      return isActive ? "button is-info is-selected" : "button";
                    }}
                    to="/"
                    title="Gå till Hem"
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    <span className="icon">
                      <i className="fas fa-home" aria-hidden="true"></i>
                    </span>
                    <span>Hem</span>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="navbar-item">
              <div className="field">
                <div className="control">
                  <NavLink
                    className={({ isActive }) => {
                      return isActive ? "button is-info is-selected" : "button";
                    }}
                    to="chart"
                    title="Gå till Diagram"
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    <span className="icon">
                      <i className="fas fa-chart-line" aria-hidden="true"></i>
                    </span>
                    <span>Diagram</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

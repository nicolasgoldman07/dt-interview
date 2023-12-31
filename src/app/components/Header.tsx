import React from "react";
import { Link } from "react-router-dom";
import { AppHeader } from "@dynatrace/strato-components-preview";

export const Header = () => {
  return (
    <AppHeader>
      <AppHeader.NavItems>
        <AppHeader.AppNavLink as={Link} to="/" />
        <AppHeader.NavItem as={Link} to="/impact-scores">
          Impact Scores
        </AppHeader.NavItem>
        <AppHeader.NavItem as={Link} to="/simulation-results">
          Simulation Results
        </AppHeader.NavItem>
      </AppHeader.NavItems>
    </AppHeader>
  );
};

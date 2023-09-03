// * Library
import { Page } from "@dynatrace/strato-components-preview";
import React from "react";
import { Route, Routes } from "react-router-dom";
// * Component
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { ImpactScores } from "./pages/ImpactScores";

export const App = () => {
  return (
    <Page>
      <Page.Header>
        <Header />
      </Page.Header>
      <Page.Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/impact-scores" element={<ImpactScores />} />
        </Routes>
      </Page.Main>
    </Page>
  );
};

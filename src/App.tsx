import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ProvideSideBarContext, ProvideThemeContext } from "hooks";
import { Layout } from "components";
import { Home } from "pages";
import moment from "moment";

export const App = () => (
  <BrowserRouter>
      <ProvideThemeContext>
        <ProvideSideBarContext>
          <Layout>
            <Routes>
            <Route path='/' element={<Home />} />
            </Routes>
          </Layout>
        </ProvideSideBarContext>
      </ProvideThemeContext>
  </BrowserRouter>
)

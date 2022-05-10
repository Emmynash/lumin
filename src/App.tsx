import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ProvideSideBarContext, ProvideThemeContext } from "hooks";
import { Layout } from "components";
import { Products } from "pages";

export const App = () => (
  <BrowserRouter>
      <ProvideThemeContext>
        <ProvideSideBarContext>
          <Layout>
            <Routes>
            <Route path='/' element={<Products />} />
            </Routes>
          </Layout>
        </ProvideSideBarContext>
      </ProvideThemeContext>
  </BrowserRouter>
)

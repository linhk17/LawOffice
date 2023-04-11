import * as React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes, staffRouter } from "./routes/routes";
import "~/assets/style/GlobalStyle.scss"
import { RequireAuth } from "./pages/Auth/RequireAuth";
import { useToken } from "./store";
import LoginPage from "./pages/Auth/Login";
import HomePage from "./pages/User/HomePage";
import LayoutUser from "./layouts/UserLayout";

function App() {
  const {token, setToken} = useToken()
  return (
    <>
    <div className="wrapper">
      <Router>
      <Routes>
        {
          !token ? 
          publicRoutes.map((route, index) => {
            let Layout = route.layout
            return (
              <Route key={index} path={route.path} element={
                <Layout>
                  <route.component />
                </Layout>
              } />
            )
          })
          : token && token.account.quyen == 1 ?
            privateRoutes.map((route, index) => {
            let Layout = route.layout
            return (
              <Route key={index} path={'/admin' + route.path} element={
                <Layout>
                  <route.component />
                </Layout>
  
              } />
            )
          })
          : token && token.account.quyen == 2 ?
          staffRouter.map((route, index) => {
            let Layout = route.layout
            return (
              <Route key={index} path={'/staff' + route.path} element={
                <Layout>
                  <route.component />
                </Layout>

              } />
            )
          })
          :
          <Route  path='/' element={
            <LayoutUser>
              <HomePage/>
            </LayoutUser>

        } />
        }
      </Routes>
      
    </Router>

    </div>
    </>
    
    
  );
}
export default App;
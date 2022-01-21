import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";
import HeroPage from "../screens/HeroPage/HeroPage";
import HomePage from "../screens/HomePage/HomePage";
import LoginPage from "../screens/LoginPage/LoginPage";
import NotFoundPage from "../screens/NotFoundPage/NotFoundPage";
import SearchPage from "../screens/SearchPage/SearchPage";
import SearchResultsPage from "../screens/SearchResultsPage/SearchResultsPage";
import TeamPage from "../screens/TeamPage/TeamPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {/* Public routes */}
        <PublicRoute exact path="/login" component={LoginPage} />
        {/* Private routes */}
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/equipo" component={TeamPage} />
        <PrivateRoute exact path="/buscar" component={SearchPage} />
        <PrivateRoute
          exact
          path="/buscar/:keywordSearch"
          component={SearchResultsPage}
        />
        <PrivateRoute path="/heroe/:heroId" component={HeroPage} />
        {/* 404 Error */}
        <Route exact path="/404" component={NotFoundPage} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>{" "}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

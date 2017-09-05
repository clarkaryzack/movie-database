import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import MainPage from "./components/MainPage.js";
import MoviePage from "./components/MoviePage.js";
import TVPage from "./components/TVPage.js";
import PersonPage from "./components/PersonPage.js";
import BaseLayout from "./base_layout.js";
import SearchResults from "./components/SearchResults.js";
import AllResults from "./components/AllResults.js";
import WatchList from "./components/WatchList.js";

ReactDOM.render(
  <BrowserRouter>
    <BaseLayout>
      <Switch>
        <Route path="/movie/:movienum" component={MoviePage} />
        <Route path="/tv/:tvnum" component={TVPage} />
        <Route path="/person/:personnum/" component={PersonPage} />
        <Route path="/search/:term/:page" component={SearchResults} />
        <Route path="/all/:genre/:term/:page" component={AllResults} />
        <Route path="/watchList" component={WatchList} />
        <Route path="/" component={MainPage} />
      </Switch>
    </BaseLayout>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();

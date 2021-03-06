import React, { useEffect, useState } from "react";

import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import AllMatches from "./pages/AllMatches";
import LiveMatches from "./pages/LiveMatches";
import OfflineMatches from "./pages/OfflineMatches";
import Ranking from "./components/Ranking";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./components/styles/main.scss";

const App = () => {
  useEffect(() => {
    console.log("useeffect");
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={AllMatches} />
            <Route path="/matches/live" component={LiveMatches} />
            <Route path="/matches/upcoming" component={OfflineMatches} />
            <Route path="/matches/history" component={Homepage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route path="/profile/teams" component={ProfilePage} />
            <Route path="/profile/matches" component={ProfilePage} />
            <Route path="/ranking" component={Ranking} />
            <Route exact path="/account-management" component={LoginPage} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;

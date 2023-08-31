import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" Component={Landing} />
          </Routes>
          <div className="container">
            <Routes>
              <Route exact path="/register" Component={Register} />
              <Route exact path="/login" Component={Login} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;

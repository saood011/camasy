import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Home from "./layout/Home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./common/PrivateRoute";
import Student from "./pages/Student";
import StudentDetails from "./pages/StudentDetails";
import Block from "./pages/Block";
import RoomAction from "./pages/RoomAction";
import Staff from "./pages/Staff";
import SingleStudent from "./pages/SingleStudent";
import Management from "./pages/Management";
import Inventory from "./pages/Inventory";

class Routes extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/student" component={Student} />
          <PrivateRoute exact path="/block" component={Block} />
          <PrivateRoute exact path="/room/:id" component={RoomAction} />
          <PrivateRoute exact path="/management" component={Management} />
          <PrivateRoute exact path="/management/staff" component={Staff} />
          <PrivateRoute
            exact
            path="/management/inventory"
            component={Inventory}
          />

          <PrivateRoute
            exact
            path="/studentdetails/:id"
            component={StudentDetails}
          />
          <PrivateRoute
            exact
            path="/studentdetails/single/:id"
            component={SingleStudent}
          />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Redirect to="/dashboard" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Routes;

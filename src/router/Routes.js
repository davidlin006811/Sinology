import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/home/home";
import Profile from "../components/profile/profile";
import Teaching from "../components/teaching/teaching";
import Life from "../components/life/life";
import Enrollment from "../components/enrollment/enrollment";
import News from "../components/news/news";
import Contact from "../components/contacts/contact";
export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/collegeprofile" component={Profile} />
      <Route path="/teaching" component={Teaching} />
      <Route path="/life" component={Life} />
      <Route path="/enrolment" component={Enrollment} />
      <Route path="/news" component={News} />
      <Route path="/contact" component={Contact} />
    </Switch>
  );
};

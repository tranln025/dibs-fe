import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from '../components/Landing/Landing';
import FreebiesContainer from '../containers/FreebiesContainer/FreebiesContainer';
import ProfileContainer from '../containers/ProfileContainer/ProfileContainer';

export default ({ currentUser }) => (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/freebies" render={() => <FreebiesContainer currentUser={currentUser} />} />
      <Route path="/profile" component={ProfileContainer} />
    </Switch>
)
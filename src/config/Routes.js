import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from '../components/Landing/Landing';
import FreebiesContainer from '../containers/FreebiesContainer/FreebiesContainer';
import ProfileContainer from '../containers/ProfileContainer/ProfileContainer';
import FreebieDetail from '../components/FreebiesList/Freebies/FreebieDetail/FreebieDetail';

export default ({ currentUser, setCurrentUser }) => (
  <Switch>
    <Route exact path="/" render={() => <Landing currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
    <Route exact path="/freebies" render={() => <FreebiesContainer currentUser={currentUser} />} />
    <Route path="/freebies/:id" render={() => <FreebieDetail currentUser={currentUser} />} />
    <Route path="/profile" component={ProfileContainer} />
  </Switch>
)
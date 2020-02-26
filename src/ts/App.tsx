import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import '~/scss/reset.scss';
import '~/scss/base.scss';

import Index from '~/ts/pages/Index';
import Login from '~/ts/pages/Login';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/login" component={Login} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default App;

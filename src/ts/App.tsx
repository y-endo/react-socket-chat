import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import '~/scss/foundation/reset.scss';
import '~/scss/foundation/base.scss';

import Auth from '~/ts/components/common/Auth';
import Index from '~/ts/pages/Index';
import Login from '~/ts/pages/Login';
import Room from '~/ts/pages/Room';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Auth>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/room/:id" component={Room} />
        </Switch>
      </Auth>
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default App;

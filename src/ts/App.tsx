import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import profileRenderCallback from '~/ts/utils/profileRenderCallback';

import '~/scss/foundation/reset.scss';
import '~/scss/foundation/base.scss';

import Auth from '~/ts/components/App/Auth';
import Index from '~/ts/pages/Index';
import Login from '~/ts/pages/Login';
import Room from '~/ts/pages/Room';
import NotFound from '~/ts/pages/404';

const App: React.FC = () => (
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Auth>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/room/:id" component={Room} />
            <Route component={NotFound} />
          </Switch>
        </Auth>
      </Switch>
    </Router>
  </React.StrictMode>
);

export default App;

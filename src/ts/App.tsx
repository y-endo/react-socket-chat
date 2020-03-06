import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import profileRenderCallback from '~/ts/utils/profileRenderCallback';

import '~/scss/foundation/reset.scss';
import '~/scss/foundation/base.scss';

import Auth from '~/ts/components/common/Auth';
import Index from '~/ts/pages/Index';
import Login from '~/ts/pages/Login';
import Room from '~/ts/pages/Room';

const App: React.FC = () => (
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Auth>
          <Switch>
            {/* <React.Profiler id="App" onRender={profileRenderCallback}> */}
            {/* <React.Profiler id="Index" onRender={profileRenderCallback}> */}
            <Route exact path="/" component={Index} />
            {/* </React.Profiler> */}
            {/* <React.Profiler id="Room" onRender={profileRenderCallback}> */}
            <Route exact path="/room/:id" component={Room} />
            {/* </React.Profiler> */}
            {/* </React.Profiler> */}
          </Switch>
        </Auth>
        <Redirect to="/" />
      </Switch>
    </Router>
  </React.StrictMode>
);

export default App;

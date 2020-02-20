import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '~/scss/reset.scss';
import '~/scss/base.scss';

import Index from '~/ts/pages/Index';

const App: React.FC = () => (
  <Router>
    <Route exact path="/" component={Index} />
  </Router>
);

export default App;

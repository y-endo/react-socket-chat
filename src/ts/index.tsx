import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '~/ts/store';
import App from '~/ts/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);

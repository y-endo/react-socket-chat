import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '~/ts/store';
import App from '~/ts/App';
import whyDidYouRender from '@welldone-software/why-did-you-render';

whyDidYouRender(React, {
  // include: [/ChatRoom/],
  trackAllPureComponents: true,
  trackHooks: true,
  logOnDifferentValues: true,
  collapseGroups: true
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);

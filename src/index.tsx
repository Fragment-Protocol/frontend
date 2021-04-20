// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import ReactDOM from 'react-dom';

import Connector from './contexts/Connector';
import App from './App';
import { Provider, rootStore } from './store/store';

ReactDOM.render(
  <Provider value={rootStore}>
    <Connector>
      <App />
    </Connector>
  </Provider>,
  document.getElementById('root'),
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import ReactDOM from 'react-dom';

import Connector from './contexts/Connector';
import ModalContext from './contexts/ModalContext';
import App from './App';

ReactDOM.render(
  <Connector>
    <ModalContext>
      <App />
    </ModalContext>
  </Connector>,
  document.getElementById('root'),
);

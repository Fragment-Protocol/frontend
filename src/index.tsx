// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ModalContext from './contexts/ModalContext';

ReactDOM.render(
  <ModalContext>
    <App />
  </ModalContext>,
  document.getElementById('root'),
);

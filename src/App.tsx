import React from 'react';

import {
  DisconnectModal,
  EndStepModal,
  ErrorModal,
  Header,
  MetamaskModal,
  NFTAddressModal,
  SecondStepModal,
} from './components';
import { HomePage } from './pages';

import './styles/index.scss';

const App: React.FC = () => {
  return (
    <div className="fragment text">
      {/* <PreviewPage /> */}
      <Header />
      <HomePage />
      <MetamaskModal />
      <DisconnectModal />
      <NFTAddressModal />
      <SecondStepModal />
      <EndStepModal />
      <ErrorModal />
    </div>
  );
};

export default App;

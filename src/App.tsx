import React from 'react';

import {
  DepositModal,
  DisconnectModal,
  EndStepModal,
  Header,
  MetamaskModal,
  NFTAddressModal,
  SecondStepModal,
  ErrorModal,
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
      <DepositModal />
      <NFTAddressModal />
      <SecondStepModal />
      <EndStepModal />
      <ErrorModal />
    </div>
  );
};

export default App;

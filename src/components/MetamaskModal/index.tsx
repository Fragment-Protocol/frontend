import React from 'react';

import Button from '../Button';
import Modal from '../Modal';

import './MetamaskModal.scss';

const MetamaskModal: React.FC = () => {
  return (
    <Modal name="connect">
      <div className="m-metamask">
        <div className="text-lg text-white m-metamask__title">MetaMask</div>
        <div className="text-gray text m-metamask__subtitle">Connect your wallet</div>
        <Button colorScheme="white" className="m-metamask__btn">
          Connect
        </Button>
      </div>
    </Modal>
  );
};

export default MetamaskModal;

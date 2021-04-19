import React from 'react';

import Button from '../Button';
import Modal from '../Modal';

import './DisconnectModal.scss';

const MetamaskModal: React.FC = () => {
  return (
    <Modal isVisible={false}>
      <div className="m-disconnect">
        <div className="text-lg text-white m-disconnect__title text-upper">ACCOUNT SETTINGS</div>
        <Button colorScheme="white">DISCONNECT WALLET</Button>
      </div>
    </Modal>
  );
};

export default MetamaskModal;

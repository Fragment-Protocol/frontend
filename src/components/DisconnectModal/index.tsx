import React from 'react';

import { useConnectorContext } from '../../contexts/Connector';
import { useModalContext } from '../../contexts/ModalContext';
import Button from '../Button';
import Modal from '../Modal';

import './DisconnectModal.scss';

const MetamaskModal: React.FC = () => {
  const connectorContext = useConnectorContext();
  const modalContext = useModalContext();

  const handleDiconnect = (): void => {
    connectorContext.disconnect();
    modalContext.handleChangeVisible('disconnect', false);
  };
  return (
    <Modal name="disconnect">
      <div className="m-disconnect">
        <div className="text-lg text-white m-disconnect__title text-upper">ACCOUNT SETTINGS</div>
        <Button colorScheme="white" onClick={handleDiconnect}>
          DISCONNECT WALLET
        </Button>
      </div>
    </Modal>
  );
};

export default MetamaskModal;

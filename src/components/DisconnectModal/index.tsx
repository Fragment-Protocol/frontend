import React from 'react';
import { observer } from 'mobx-react-lite';

import { useConnectorContext } from '../../contexts/Connector';
import Button from '../Button';
import Modal from '../Modal';
import { useMst } from '../../store/store';

import './DisconnectModal.scss';

const MetamaskModal: React.FC = observer(() => {
  const { modals } = useMst();
  const connectorContext = useConnectorContext();

  const handleDiconnect = (): void => {
    connectorContext.disconnect();
    modals.changeVisible('disconnect', false);
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
});

export default MetamaskModal;

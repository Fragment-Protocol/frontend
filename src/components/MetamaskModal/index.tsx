import React from 'react';
import { observer } from 'mobx-react-lite';

import { useConnectorContext } from '../../contexts/Connector';
import { useMst } from '../../store/store';
import Button from '../Button';
import Modal from '../Modal';

import './MetamaskModal.scss';

const MetamaskModal: React.FC = observer(() => {
  const { modals } = useMst();
  const connectorContext = useConnectorContext();

  const handleConnect = (): void => {
    connectorContext.connect().then(() => {
      modals.changeVisible('connect', false);
    });
  };
  return (
    <Modal name="connect">
      <div className="m-metamask">
        <div className="text-lg text-white m-metamask__title">MetaMask</div>
        <div className="text-gray text m-metamask__subtitle">Connect your wallet</div>
        <Button colorScheme="white" className="m-metamask__btn" onClick={handleConnect}>
          Connect
        </Button>
      </div>
    </Modal>
  );
});

export default MetamaskModal;

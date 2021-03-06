import React from 'react';
import { observer } from 'mobx-react-lite';

import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';
import { useMst } from '../../store/store';
import { useConnectorContext } from '../../contexts/Connector';
import web3Config from '../../services/web3/config';

import './NFTAddressModal.scss';

const NFTAddressModal: React.FC = observer(() => {
  const { modals } = useMst();
  const [address, setAddress] = React.useState('');
  const connectContext = useConnectorContext();
  const [id, setId] = React.useState('');

  const handleContinue = async () => {
    modals.setNftData(address, id);
    const isApproved = await connectContext.metamaskService.checkNfTTokenAllowance(
      address,
      'NFT',
      web3Config.ETH.ADDRESS,
    );
    modals.changeVisible('address', false);
    if (isApproved) {
      modals.changeVisible('end', true);
    } else {
      modals.changeVisible('approveLock', true);
    }
  };

  const handleClose = () => {
    setAddress('');
    setId('');
  };

  return (
    <Modal name="address" destroyOnClose handleCancel={handleClose}>
      <div className="m-deposit m-nft-addr">
        <div className="text-lg text-white m-deposit__title">NFT Contract Address:</div>
        <div className="text text-gray m-deposit__subtitle m-nft-addr__subtitle">
          Paste the address of the NFT contract and pay the TX fee, it will automatically create a
          pool to tokenize your NFTs.
        </div>
        <Input
          className="m-deposit__input"
          value={address}
          placeholder="Paste Contract Address"
          type="text"
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          className="m-deposit__input"
          value={id}
          placeholder="NFT ID"
          type="text"
          onChange={(e) => setId(e.target.value)}
        />
        <Button
          disabled={!address || !id}
          colorScheme="white"
          className="m-deposit__btn"
          onClick={handleContinue}
        >
          ADD ASSET
        </Button>
      </div>
    </Modal>
  );
});

export default NFTAddressModal;

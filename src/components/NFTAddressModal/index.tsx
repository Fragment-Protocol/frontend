import React from 'react';

import Button from '../Button';
import Input from '../Input';
import { useModalContext } from '../../contexts/ModalContext';
import Modal from '../Modal';

import './NFTAddressModal.scss';

const NFTAddressModal: React.FC = () => {
  const [address, setAddress] = React.useState('');
  const modalContext = useModalContext();

  const handleContinue = (): void => {
    modalContext.handleChangeVisible('token', true);
    modalContext.handleChangeVisible('address', false);
  };
  return (
    <Modal name="address">
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
          type="number"
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button
          disabled={!address}
          colorScheme="white"
          className="m-deposit__btn"
          onClick={handleContinue}
        >
          ADD ASSET
        </Button>
      </div>
    </Modal>
  );
};

export default NFTAddressModal;
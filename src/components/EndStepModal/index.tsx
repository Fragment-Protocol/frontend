import React from 'react';

import ArrowImg from '../../assets/img/icons/arrow.svg';
import { useModalContext } from '../../contexts/ModalContext';
import { useConnectorContext } from '../../contexts/Connector';
import Button from '../Button';
import Modal from '../Modal';

import './EndStepModal.scss';

const EndStepModal: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const modalContext = useModalContext();
  const connectContext = useConnectorContext();

  const handleBack = (): void => {
    modalContext.handleChangeVisible('address', true);
    modalContext.handleChangeVisible('end', false);
  };

  const handleEnd = async () => {
    setLoading(true);
    const { address, id } = modalContext.nft;
    try {
      await connectContext.metamaskService.approveToken(address, id);
      await connectContext.metamaskService.createTransaction('ETH', 'depositNft', [address, id]);

      setLoading(false);
      modalContext.handleChangeVisible('end', false);
      modalContext.handleChangeVisible('token', true);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Modal name="end">
      <div className="m-end">
        <div
          className="m-end__back"
          onClick={handleBack}
          onKeyDown={handleBack}
          role="button"
          tabIndex={0}
        >
          <img src={ArrowImg} alt="back" />
        </div>
        <div className="text-bold text-xl text-white m-end__text">
          After proceeding, your NFT will be locked up able to proceed to the creation of BEP-20
          tokens in the Binance network.
        </div>
        <Button colorScheme="white" className="m-end__btn" onClick={handleEnd} loading={loading}>
          <span className="text-upper">it&apos;s fine</span>
        </Button>
      </div>
    </Modal>
  );
};

export default EndStepModal;

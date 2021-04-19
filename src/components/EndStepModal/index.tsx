import React from 'react';

import Button from '../Button';
import Modal from '../Modal';
import ArrowImg from '../../assets/img/icons/arrow.svg';
import { useModalContext } from '../../contexts/ModalContext';

import './EndStepModal.scss';

const EndStepModal: React.FC = () => {
  const modalContext = useModalContext();

  const handleBack = (): void => {
    modalContext.handleChangeVisible('token', true);
    modalContext.handleChangeVisible('end', false);
  };

  const handleEnd = (): void => {
    modalContext.handleChangeVisible('end', false);
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
          After proceeding, your NFT will be locked up and you will get{' '}
          <span className="text-orange">%amount% %short name%</span> tokens on Binance Smart Chain -
          are you sure?
        </div>
        <Button colorScheme="white" className="m-end__btn" onClick={handleEnd}>
          <span className="text-upper">it&apos;s fine</span>
        </Button>
      </div>
    </Modal>
  );
};

export default EndStepModal;

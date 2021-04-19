import React from 'react';

import { useModalContext } from '../../contexts/ModalContext';
import Button from '../Button';
import Modal from '../Modal';
import BscImg from '../../assets/img/icons/bsc.svg';
import EthImg from '../../assets/img/icons/eth.svg';

import './ErrorModal.scss';

const MetamaskModal: React.FC = () => {
  const modalContext = useModalContext();

  const handleOk = (): void => {
    modalContext.handleError('');
  };
  return (
    <Modal name="errMsg">
      <div className="m-error">
        {modalContext.errMsg === 'eth' ? (
          <img src={EthImg} alt="" className="m-error__img" />
        ) : (
          <img src={BscImg} alt="" className="m-error__img" />
        )}
        <div className="text-lg text-white m-error__title">
          <p>Current Network mismatch.</p>
          {modalContext.errMsg === 'eth' ? (
            <span>Please Select: Rinkeby network</span>
          ) : (
            <span>Please Select: Bsc testnet</span>
          )}
        </div>
        <Button colorScheme="white" className="m-error__btn" onClick={handleOk} size="lg">
          Ok
        </Button>
      </div>
    </Modal>
  );
};

export default MetamaskModal;

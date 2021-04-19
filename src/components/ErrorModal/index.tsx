import React from 'react';

import Button from '../Button';
import Modal from '../Modal';
import { useModalContext } from '../../contexts/ModalContext';

import './ErrorModal.scss';

const MetamaskModal: React.FC = () => {
  const modalContext = useModalContext();

  const handleOk = (): void => {
    modalContext.handleError('');
  };
  return (
    <Modal name="errMsg">
      <div className="m-error">
        <div className="text-lg text-white m-error__title">{modalContext.errMsg}</div>
        <Button colorScheme="white" className="m-error__btn" onClick={handleOk}>
          Ok
        </Button>
      </div>
    </Modal>
  );
};

export default MetamaskModal;

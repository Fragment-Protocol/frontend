import React from 'react';

import { SecondStepForm } from '../../forms';
import Modal from '../Modal';

import './SecondStepModal.scss';

const SecondStepModal: React.FC = () => {
  return (
    <Modal name="token">
      <div className="m-step">
        <div className="text-lg m-step__title text-white">Step 2</div>
        <SecondStepForm />
      </div>
    </Modal>
  );
};

export default SecondStepModal;

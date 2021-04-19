import React from 'react';

import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';

import './DepositModal.scss';

const DepositModal: React.FC = () => {
  const [amount, setAmount] = React.useState('');

  return (
    <Modal name="deposit">
      <div className="m-deposit">
        <div className="text-lg text-white m-deposit__title">Deposit</div>
        <div className="text text-gray m-deposit__subtitle">sub head</div>
        <Input
          className="m-deposit__input"
          value={amount}
          placeholder="Amount"
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button disabled={!amount} colorScheme="white" className="m-deposit__btn">
          Deposit
        </Button>
      </div>
    </Modal>
  );
};

export default DepositModal;

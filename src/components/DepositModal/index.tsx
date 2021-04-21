import React from 'react';
import { observer } from 'mobx-react-lite';

import Button from '../Button';
import Input from '../Input';
import { useConnectorContext } from '../../contexts/Connector';
import { useMst } from '../../store/store';
import MetamaskService from '../../services/web3';
import Modal from '../Modal';
import web3Config from '../../services/web3/config';

import './DepositModal.scss';

interface IDepositModal {
  tokenAddress: string;
  decimals: number;
}

const DepositModal: React.FC<IDepositModal> = observer(({ tokenAddress, decimals }) => {
  const { modals, cards } = useMst();
  const [amount, setAmount] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const connectContext = useConnectorContext();

  const handleDeposit = async () => {
    setLoading(true);
    try {
      await connectContext.metamaskService.approveToken(tokenAddress, 'BEP', [
        web3Config.BSC.ADDRESS,
        MetamaskService.calcTransactionAmount(+amount, decimals),
      ]);
      await connectContext.metamaskService.createTransaction('BSC', 'returnTokens', [
        tokenAddress,
        MetamaskService.calcTransactionAmount(+amount, decimals),
      ]);

      setLoading(false);
      modals.changeVisible('deposit', false);
      await cards.getItems();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

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
        <Button
          disabled={!amount}
          colorScheme="white"
          className="m-deposit__btn"
          loading={loading}
          onClick={handleDeposit}
        >
          Deposit
        </Button>
      </div>
    </Modal>
  );
});

export default DepositModal;

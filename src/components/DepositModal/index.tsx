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

const DepositModal: React.FC = observer(() => {
  const { modals, cards } = useMst();
  const [amount, setAmount] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const connectContext = useConnectorContext();

  const handleDeposit = async () => {
    setLoading(true);
    console.log(modals.depositData.tokenAddress, modals.depositData.decimals);
    try {
      await connectContext.metamaskService.approveToken(modals.depositData.tokenAddress, 'BEP', [
        web3Config.BSC.ADDRESS,
        MetamaskService.calcTransactionAmount(+amount, modals.depositData.decimals),
      ]);
      await connectContext.metamaskService.createTransaction('BSC', 'returnTokens', [
        modals.depositData.tokenAddress,
        MetamaskService.calcTransactionAmount(+amount, modals.depositData.decimals),
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
    <Modal name="deposit" destroyOnClose>
      <div className="m-deposit">
        <div className="text-lg text-white m-deposit__title">Deposit</div>
        <div className="text text-gray m-deposit__subtitle">{modals.depositData.tokenName}</div>
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

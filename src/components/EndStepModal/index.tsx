import React from 'react';
import { observer } from 'mobx-react-lite';

import ArrowImg from '../../assets/img/icons/arrow.svg';
import { useConnectorContext } from '../../contexts/Connector';
import Button from '../Button';
import Modal from '../Modal';
import { useMst } from '../../store/store';

import './EndStepModal.scss';

const EndStepModal: React.FC = observer(() => {
  const { modals } = useMst();
  const [loading, setLoading] = React.useState(false);
  const connectContext = useConnectorContext();

  const handleBack = (): void => {
    modals.changeVisible('address', true);
    modals.changeVisible('end', false);
  };

  const handleEnd = async () => {
    setLoading(true);
    const { address, id } = modals.nft;
    try {
      await connectContext.metamaskService.createTransaction(
        'ETH',
        'depositNft',
        [address, id],
        true,
      );
      setLoading(false);
      modals.changeVisible('end', false);
      localStorage.fragment_create = true;
      modals.changeVisible('token', true);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Modal name="end" destroyOnClose>
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
        <div className="m-end__subtitle text text-gray">
          For this operation, we charge an additional commission to pay for service transactions
        </div>
        <Button colorScheme="white" className="m-end__btn" onClick={handleEnd} loading={loading}>
          <span className="text-upper">it&apos;s fine</span>
        </Button>
      </div>
    </Modal>
  );
});

export default EndStepModal;

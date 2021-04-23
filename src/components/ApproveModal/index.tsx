import React from 'react';
import { observer } from 'mobx-react-lite';

import Button from '../Button';
import { useMst } from '../../store/store';
import Modal from '../Modal';

import './ApproveModal.scss';

interface IApproveModal {
  name: 'approveDeposit' | 'approveLock';
  nextModal?:
    | 'connect'
    | 'disconnect'
    | 'deposit'
    | 'address'
    | 'token'
    | 'end'
    | 'approveDeposit'
    | 'approveLock';
  handleApprove: () => {};
}

const ApproveModal: React.FC<IApproveModal> = observer(({ name, handleApprove, nextModal }) => {
  const { modals } = useMst();
  const [loading, setLoading] = React.useState(false);

  const onApprove = async () => {
    setLoading(true);
    try {
      await handleApprove();
      if (nextModal) {
        modals.changeVisible(nextModal, true);
      }
      modals.changeVisible(name, false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Modal name={name}>
      <div className="m-approve">
        <div className="text-lg text-white m-approve__title">
          First, we need to get an approval for this operation
        </div>
        <Button
          colorScheme="white"
          className="m-approve__btn"
          loading={loading}
          onClick={onApprove}
        >
          Approve
        </Button>
      </div>
    </Modal>
  );
});

export default ApproveModal;

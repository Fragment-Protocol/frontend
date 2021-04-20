import React from 'react';
import { observer } from 'mobx-react-lite';

import Button from '../Button';
import ModalErr from '../ModalErr';
import BscImg from '../../assets/img/icons/bsc.svg';
import { useMst } from '../../store/store';
import EthImg from '../../assets/img/icons/eth.svg';

import './ErrorModal.scss';

const MetamaskModal: React.FC = observer(() => {
  const { modals } = useMst();

  const handleOk = (): void => {
    modals.handleError('');
  };
  return (
    <ModalErr>
      <div className="m-error">
        {modals.errMsg === 'eth' ? (
          <img src={EthImg} alt="" className="m-error__img" />
        ) : (
          <img src={BscImg} alt="" className="m-error__img" />
        )}
        <div className="text-lg text-white m-error__title">
          <p>Current Network mismatch.</p>
          {modals.errMsg === 'eth' ? (
            <span>Please Select: Rinkeby network</span>
          ) : (
            <span>Please Select: Bsc testnet</span>
          )}
        </div>
        <Button colorScheme="white" className="m-error__btn" onClick={handleOk} size="lg">
          Ok
        </Button>
      </div>
    </ModalErr>
  );
});

export default MetamaskModal;

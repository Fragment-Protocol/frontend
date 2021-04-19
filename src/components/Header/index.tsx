import React from 'react';

import LogoImg from '../../assets/img/icons/logo.svg';
import MetamaskImg from '../../assets/img/icons/metamask.svg';
import Button from '../Button';
import { useModalContext } from '../../contexts/ModalContext';
import { useConnectorContext } from '../../contexts/Connector';

import './Header.scss';

const Header: React.FC = () => {
  const modalContext = useModalContext();
  const connectorContext = useConnectorContext();

  const handleConnect = (): void => {
    modalContext.handleChangeVisible('connect', true);
  };

  const handleDisconnect = (): void => {
    modalContext.handleChangeVisible('disconnect', true);
  };

  return (
    <header className="header">
      <div className="row">
        <div className="header__content">
          <img src={LogoImg} alt="fragment" />
          {!connectorContext.address ? (
            <Button colorScheme="black" onClick={handleConnect} className="header__btn">
              <img src={MetamaskImg} alt="metamask" />
              <span className="text-md">Connect MetaMask</span>
            </Button>
          ) : (
            ''
          )}
          {connectorContext.address ? (
            <Button colorScheme="black" onClick={handleDisconnect} className="header__btn">
              <span className="text-md text-ellipsis">{connectorContext.address}</span>
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

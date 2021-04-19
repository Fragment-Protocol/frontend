import React from 'react';

import LogoImg from '../../assets/img/icons/logo.svg';
import Button from '../Button';
import { useModalContext } from '../../contexts/ModalContext';

import './Header.scss';

const Header: React.FC = () => {
  const modalContext = useModalContext();

  const handleConnect = (): void => {
    modalContext.handleChangeVisible('connect', true);
  };

  return (
    <header className="header">
      <div className="row">
        <div className="header__content">
          <img src={LogoImg} alt="fragment" />
          <Button colorScheme="black" onClick={handleConnect}>
            <span className="text-md">Connect MetaMask</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

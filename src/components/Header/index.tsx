import React from 'react';
import { observer } from 'mobx-react-lite';

import LogoImg from '../../assets/img/icons/logo.svg';
import MetamaskImg from '../../assets/img/icons/metamask.svg';
import { useMst } from '../../store/store';
import Button from '../Button';

import './Header.scss';

const Header: React.FC = observer(() => {
  const { modals, user } = useMst();

  const handleConnect = (): void => {
    modals.changeVisible('connect', true);
  };

  const handleDisconnect = (): void => {
    modals.changeVisible('disconnect', true);
  };

  return (
    <header className="header">
      <div className="row">
        <div className="header__content">
          <img src={LogoImg} alt="fragment" className="header__logo" />
          {!user.address ? (
            <Button
              colorScheme={window.innerWidth > 768 ? 'black' : 'white'}
              onClick={handleConnect}
              size={window.innerWidth > 768 ? 'md' : 'sm'}
              className="header__btn"
            >
              {window.innerWidth > 768 ? <img src={MetamaskImg} alt="metamask" /> : ''}
              <span className="text-md">Connect MetaMask</span>
            </Button>
          ) : (
            ''
          )}
          {user.address ? (
            <Button
              colorScheme={window.innerWidth > 768 ? 'black' : 'white'}
              size={window.innerWidth > 768 ? 'md' : 'sm'}
              onClick={handleDisconnect}
              className="header__btn"
            >
              <span className="text-md text-ellipsis">{user.address}</span>
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;

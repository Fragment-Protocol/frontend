import React from 'react';
import { observer } from 'mobx-react-lite';

import PreviewImg from '../../assets/img/preview.png';
import { Button, NFTCard } from '../../components';
import config from '../../config';
import { useMst } from '../../store/store';

import './Home.scss';

const Home: React.FC = observer(() => {
  const { modals, user } = useMst();
  const cards = [
    {
      name: 'HASHMASKS',
      price: '250 000',
      totalSypply: 1000,
      sold: 250,
      star: true,
    },
    {
      name: 'HASHMASKS',
      price: '250 000',
      totalSypply: 1000,
      sold: 250,
      isWithdraw: true,
    },
  ];
  const handleOpenAddressModal = (): void => {
    if (user.address) {
      if (user.network === config.networkEth) {
        modals.changeVisible('address', true);
      } else {
        modals.handleError('eth');
      }
    } else {
      modals.changeVisible('connect', true);
    }
  };

  return (
    <main className="home">
      <div className="home__preview">
        <div className="row home__preview-row">
          <div className="home__preview-img">
            <img src={PreviewImg} alt="" />
          </div>
          <div className="home__preview-content">
            <h1 className="h1 home__preview-title text-white">
              Cross-chain NFT fractionalization protocol
            </h1>
            <p className="home__preview-subtitle text-white">
              Lock up your NFT, issue BEP-20 tokens and bring them to DeFi world.
            </p>
            <Button colorScheme="white" onClick={handleOpenAddressModal}>
              + ADD ASSET
            </Button>
          </div>
        </div>
      </div>
      <div className="home__content">
        <div className="row home__content-row">
          {cards.map((item) => (
            <NFTCard {...item} />
          ))}
        </div>
      </div>
    </main>
  );
});

export default Home;

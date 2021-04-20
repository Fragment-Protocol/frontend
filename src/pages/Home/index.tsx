import React from 'react';
import { observer } from 'mobx-react-lite';

import PreviewImg from '../../assets/img/preview.png';
import { Button, NFTCard } from '../../components';
import { useConnectorContext } from '../../contexts/Connector';
import config from '../../config';
import { useMst } from '../../store/store';

import './Home.scss';

const Home: React.FC = observer(() => {
  const connect = useConnectorContext();
  const { modals, user, cards } = useMst();

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

  React.useEffect(() => {
    cards.getItems();
  }, [cards, connect.metamaskService]);

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
          {cards.items.map((item) => (
            <NFTCard
              name={item.bep20.name}
              price={0}
              totalSypply={item.bep20.total}
              sold={item.bep20.current_balance}
              isWithdraw={item.ready_to_withdraw}
              me={item.owner === user.address}
              tokenAddress={item.bep20.tokenAddress}
              url={item.permalink ? item.permalink : ''}
              img={item.image_url ? item.image_url : ''}
            />
          ))}
        </div>
      </div>
    </main>
  );
});

export default Home;
